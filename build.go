package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"strings"
	"sync"

	cp "github.com/otiai10/copy"
)

// ========== PLACEHOLDERS - CHANGE THESE ==========
const (
	gitHubRepo   = "https://github.com/hacktronics/farm"
	gitBranch    = "main"
	cnameDomain  = "farm.skool.cc"    // set to "" to skip CNAME creation
	webDeployDir = "..\\farmgame-web" // relative to project root, where final files go for git push
)

// ==================================================

type ObfuscatorCommand struct {
	cmdPath string
	args    []string
	outFile string
}

var (
	guard              chan struct{}
	wg                 sync.WaitGroup
	mu                 sync.Mutex
	npmPath            string
	obfuscatorCommands []ObfuscatorCommand
	ignoreFiles        = []string{"favicon.svg", "favicon.ico", "hsv-sprite-sm.png", "hsva-sprite.png", "hsva-sprite-sm.png", "hsv-sprite.png"}
)

const currentWorkingDirMsg = "Current working directory: "

func main() {
	buildPtr := flag.Bool("build", true, "build the vite project")
	processPtr := flag.Bool("process", true, "process and obfuscate build files")
	uploadPtr := flag.Bool("upload", true, "upload to github")
	validatePtr := flag.Bool("validate", false, "ask for confirmation before uploading")
	flag.Parse()

	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	userHome := getCurrentUserHomeDir()
	npmPath = filepath.Join(userHome, "AppData", "Roaming", "npm")

	buildDir := filepath.Join(cwd, "build")
	deployDir := filepath.Join(cwd, "deploy")

	fmt.Println("Project directory:", cwd)
	fmt.Println("Build directory:", buildDir)
	fmt.Println("Deploy directory:", deployDir)

	// Clean deploy directory
	cleanDirectory(deployDir)

	// Create CNAME if needed
	if cnameDomain != "" {
		createCNAMEFile(filepath.Join(deployDir, "CNAME"), cnameDomain)
	}

	// Step 1: Build
	if *buildPtr {
		buildProject(cwd)
	}

	// Step 2: Process and obfuscate
	if *processPtr {
		processFiles(cwd, buildDir)
		runObfuscatorCommands()
	}

	// Step 3: Validate
	if *validatePtr {
		fmt.Println("\nPress 'Y' to continue with upload...")
		input := bufio.NewScanner(os.Stdin)
		input.Scan()
		if strings.ToLower(input.Text()) != "y" {
			fmt.Println("Aborted.")
			return
		}
	}

	// Verify critical files
	criticalFiles := []string{"index.html"}
	for _, f := range criticalFiles {
		if ok, _ := exists(filepath.Join(deployDir, f)); !ok {
			fmt.Printf("\nBuild failed: critical file %s is missing from deploy/\n", f)
			return
		}
	}
	fmt.Println("\nAll critical files verified in deploy/.")

	// Step 4: Upload
	if *uploadPtr {
		ideDir := filepath.Join(cwd, webDeployDir)
		cleanWebDeployDirectory(ideDir)
		copyDeployToWeb(deployDir, ideDir)
		pushToGitHub(ideDir)
	}

	fmt.Println("\nDone.")
}

// ==================== Build ====================

func buildProject(cwd string) {
	fmt.Println("\nBuilding the vite project...")
	os.Chdir(cwd)
	cmd := exec.Command("npm", "run", "build")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Env = os.Environ()
	if err := cmd.Run(); err != nil {
		log.Fatal("Build failed:", err)
	}
	fmt.Println("Build completed successfully.")
}

// ==================== File Processing ====================

func processFiles(cwd string, buildDir string) {
	os.Chdir(cwd)
	maxGoroutines := 24
	guard = make(chan struct{}, maxGoroutines)
	wg = sync.WaitGroup{}
	obfuscatorCommands = nil

	fmt.Println("\nProcessing build files...")
	filepath.WalkDir(buildDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if strings.Contains(path, ".git"+string(os.PathSeparator)) {
			return nil
		}
		if !d.IsDir() {
			guard <- struct{}{}
			wg.Add(1)
			go processFile(path, d.Name(), cwd)
		}
		return nil
	})
	wg.Wait()
	fmt.Println("\nFinished processing files.")
}

func processFile(fPath string, fileName string, cwd string) {
	defer func() {
		<-guard
		wg.Done()
	}()

	outPath := strings.Replace(fPath, string(os.PathSeparator)+"build"+string(os.PathSeparator),
		string(os.PathSeparator)+"deploy"+string(os.PathSeparator), 1)
	dir := filepath.Dir(outPath)

	if dirExists, _ := exists(dir); !dirExists {
		os.MkdirAll(dir, 0755)
	}

	fmt.Print(".")

	ext := strings.ToLower(filepath.Ext(fPath))
	switch ext {
	case ".js":
		// Minify with terser
		cmdPath := filepath.Join(npmPath, "terser")
		success := runCommand(cmdPath, "-c", "ecma=2015,computed_props=false", "-m", "-o", outPath, fPath)
		if !success {
			fmt.Printf("\n  terser failed, copying original: %s", fPath)
			copyFile(fPath, outPath)
		}
		// Queue obfuscation
		obfCmdPath := filepath.Join(npmPath, "javascript-obfuscator")
		tmp := replaceFileExtension(outPath, ".js", ".obfuscated.js")
		mu.Lock()
		obfuscatorCommands = append(obfuscatorCommands, ObfuscatorCommand{
			cmdPath: obfCmdPath,
			args:    []string{outPath, "--output", tmp},
			outFile: outPath,
		})
		mu.Unlock()

	case ".mjs":
		cmdPath := filepath.Join(npmPath, "terser")
		jsOutPath := replaceFileExtension(outPath, ".mjs", ".js")
		success := runCommand(cmdPath, "-c", "ecma=2015,computed_props=false", "-m", "-o", jsOutPath, fPath)
		if !success {
			fmt.Printf("\n  terser failed, copying original: %s", fPath)
			copyFile(fPath, jsOutPath)
		}
		obfCmdPath := filepath.Join(npmPath, "javascript-obfuscator")
		tmp := replaceFileExtension(jsOutPath, ".js", ".obfuscated.js")
		mu.Lock()
		obfuscatorCommands = append(obfuscatorCommands, ObfuscatorCommand{
			cmdPath: obfCmdPath,
			args:    []string{jsOutPath, "--output", tmp},
			outFile: replaceFileExtension(jsOutPath, ".js", ".mjs"),
		})
		mu.Unlock()

	case ".css":
		cmdPath := filepath.Join(npmPath, "cleancss")
		runCommand(cmdPath, "-o", outPath, fPath, "", "", "")

	case ".png":
		cmdPath := filepath.Join(npmPath, "pngquant.exe")
		runCommand(cmdPath, "--force", "--quality=50-100", "--strip", "--output", outPath, fPath)

	case ".jpg", ".jpeg":
		cmdPath := filepath.Join(npmPath, "mozjpeg")
		runCommand(cmdPath, "-outfile", outPath, fPath, "", "", "")

	case ".svg":
		cmdPath := filepath.Join(npmPath, "svgo")
		runCommand(cmdPath, fPath, "-o", outPath, "--quiet", "", "")

	case ".gif":
		cmdPath := filepath.Join(npmPath, "gifsicle.exe")
		runCommand(cmdPath, "-O3", "--colors=64", "--lossy=80", "-o", outPath, fPath)

	case ".html":
		cmdPath := filepath.Join(npmPath, "html-minifier")
		runCommand(cmdPath, fPath, "-o", outPath, "--remove-comments", "--collapse-whitespace", "")

	case ".map":
		// Remove source maps
		os.Remove(fPath)
		return

	case ".txt":
		if strings.Contains(fPath, "LICENSE") {
			os.Remove(fPath)
			return
		}
		copyFile(fPath, outPath)

	default:
		copyFile(fPath, outPath)
	}

	// If output is smaller than expected or missing, fallback to copy
	if outPath != fPath {
		delOutputFile(fPath, outPath)
	}
}

func runObfuscatorCommands() {
	if len(obfuscatorCommands) == 0 {
		return
	}
	fmt.Println("\nRunning obfuscator on", len(obfuscatorCommands), "files...")
	wg = sync.WaitGroup{}
	// Limit concurrent obfuscation to reduce memory usage
	obfGuard := make(chan struct{}, 4) // Reduced from unlimited to 4 concurrent
	for _, cmd := range obfuscatorCommands {
		wg.Add(1)
		obfGuard <- struct{}{}
		go func(c ObfuscatorCommand) {
			defer wg.Done()
			defer func() { <-obfGuard }()
			processObfuscatorCommand(c)
		}(cmd)
	}
	wg.Wait()
	fmt.Println("\nFinished obfuscation.")
}

func processObfuscatorCommand(cmd ObfuscatorCommand) {
	success := runCommand(cmd.cmdPath, cmd.args[0], cmd.args[1], cmd.args[2], "", "", "")

	// If obfuscation failed (e.g., out of memory), keep the original
	if !success {
		if cmd.args[0] != cmd.outFile {
			copyFile(cmd.args[0], cmd.outFile)
		}
		os.Remove(cmd.args[2]) // clean up temp file if any
		fmt.Printf("\nx skipped (failed): %s\n  cmd: %s %s", cmd.outFile, cmd.cmdPath, strings.Join(cmd.args, " "))
		return
	}

	if _, err := os.Stat(cmd.args[0]); err != nil {
		// Original file missing, skip
		return
	}
	if _, err := os.Stat(cmd.args[2]); err != nil {
		// Obfuscation output missing, keep original
		if cmd.args[0] != cmd.outFile {
			copyFile(cmd.args[0], cmd.outFile)
		}
		fmt.Printf("\nx skipped (no output): %s\n  cmd: %s %s", cmd.outFile, cmd.cmdPath, strings.Join(cmd.args, " "))
		return
	}

	if filesEqual(cmd.args[0], cmd.args[2]) {
		// Obfuscation didn't change the file, use original
		if cmd.args[0] != cmd.outFile {
			copyFile(cmd.args[0], cmd.outFile)
			os.Remove(cmd.args[0])
		}
		os.Remove(cmd.args[2]) // clean up temp file
		fmt.Printf("\nx skipped (unchanged): %s\n  cmd: %s %s\r\n", cmd.outFile, cmd.cmdPath, strings.Join(cmd.args, " "))
	} else {
		os.Remove(cmd.args[0])
		copyFile(cmd.args[2], cmd.outFile)
		os.Remove(cmd.args[2])
		fmt.Print(".")
	}
}

// ==================== Deploy & Upload ====================

func cleanDirectory(dir string) {
	fmt.Println("Cleaning directory:", dir)
	os.RemoveAll(dir)
	os.MkdirAll(dir, 0755)
}

func cleanWebDeployDirectory(ideDir string) {
	fmt.Println("Cleaning web deploy directory (preserving .git):", ideDir)
	os.Chdir(ideDir)
	files, err := filepath.Glob("*")
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, f := range files {
		if f != ".git" {
			os.RemoveAll(f)
		}
	}
}

func copyDeployToWeb(deployDir string, ideDir string) {
	fmt.Println("Copying deploy to web directory...")
	cp.Copy(deployDir, ideDir)
}

func pushToGitHub(ideDir string) {
	os.Chdir(ideDir)
	fmt.Println(currentWorkingDirMsg, ideDir)

	accessToken := os.Getenv("GITHUB_ACCESS_TOKEN")
	if accessToken == "" {
		fmt.Println("GITHUB_ACCESS_TOKEN environment variable not set. Skipping push.")
		return
	}

	repo := strings.Replace(gitHubRepo, "<ACCESS_TOKEN>", accessToken, 1)

	fmt.Println("Adding all files...")
	runCommand("git", "add", ".", "", "", "", "")
	fmt.Println("Committing...")
	runCommand("git", "commit", "-m", "Automated build and deploy", "", "", "")
	fmt.Println("Pushing to GitHub...")
	runCommand("git", "push", "--progress", repo, gitBranch, "--force", "")
}

func createCNAMEFile(outPath string, cname string) {
	fmt.Println("Creating CNAME file:", outPath)
	os.WriteFile(outPath, []byte(cname), 0644)
}

// ==================== Utilities ====================

func runCommand(app, arg0, arg1, arg2, arg3, arg4, arg5 string) bool {
	var args []string
	for _, a := range []string{arg0, arg1, arg2, arg3, arg4, arg5} {
		if a != "" {
			args = append(args, a)
		}
	}
	cmd := exec.Command(app, args...)
	if os.Getenv("NODE_ENV") == "production" {
		cmd.Env = os.Environ()
	}
	output, err := cmd.CombinedOutput()
	if err != nil {
		// Check if this file should be ignored BEFORE printing anything
		ignored := false
		for _, el := range ignoreFiles {
			for _, a := range args {
				if strings.Contains(a, el) {
					ignored = true
					break
				}
			}
			if ignored {
				break
			}
		}
		if !ignored {
			fmt.Printf("\nError: \"%s\" %s\n", app, strings.Join(args, " "))
			fmt.Println(err.Error())
			fmt.Println("Output:", string(output))
		}
		return false
	}
	return true
}

func copyFile(src, dst string) (int64, error) {
	srcStat, err := os.Stat(src)
	if err != nil {
		return 0, err
	}
	if !srcStat.Mode().IsRegular() {
		return 0, fmt.Errorf("%s is not a regular file", src)
	}
	source, err := os.Open(src)
	if err != nil {
		return 0, err
	}
	defer source.Close()

	dest, err := os.Create(dst)
	if err != nil {
		return 0, err
	}
	defer dest.Close()

	return io.Copy(dest, source)
}

func filesEqual(path1, path2 string) bool {
	f1, err := os.ReadFile(path1)
	if err != nil {
		return false
	}
	f2, err := os.ReadFile(path2)
	if err != nil {
		return false
	}
	if len(f1) != len(f2) {
		return false
	}
	for i := range f1 {
		if f1[i] != f2[i] {
			return false
		}
	}
	return true
}

func delOutputFile(in string, out string) {
	outExists, _ := exists(out)
	if outExists {
		inInfo, err := os.Stat(in)
		if err != nil {
			return
		}
		outInfo, err := os.Stat(out)
		if err != nil {
			return
		}
		if inInfo.Size() < outInfo.Size() {
			fmt.Printf("\n  output larger than original (%d > %d), using original: %s\r\n", outInfo.Size(), inInfo.Size(), out)
			os.Remove(out)
			copyFile(in, out)
		}
	} else {
		ignored := false
		for _, el := range ignoreFiles {
			if strings.Contains(out, el) {
				ignored = true
				break
			}
		}
		if !ignored {
			fmt.Println("\nWarning:", out, "does not exist, copying original.")
		}
		copyFile(in, out)
	}
}

func exists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

func replaceFileExtension(fPath string, oldExt string, newExt string) string {
	return strings.TrimSuffix(fPath, oldExt) + newExt
}

func getCurrentUserHomeDir() string {
	u, err := user.Current()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("User home:", u.HomeDir)
	return u.HomeDir
}
