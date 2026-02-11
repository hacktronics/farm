# FarmGame Build & Deploy Tool

A Go-based build pipeline that compiles, minifies, obfuscates, and deploys the FarmGame project.

## Prerequisites

- [Go](https://go.dev/dl/) 1.21+
- [Node.js](https://nodejs.org/) with npm
- The following npm packages installed **globally**:

```bash
npm install -g terser javascript-obfuscator clean-css-cli html-minifier svgo
```

- Platform-specific binaries available in your npm global path:
  - `pngquant` (PNG compression)
  - `mozjpeg` (JPEG compression)
  - `gifsicle` (GIF compression)

## Setup

1. Initialize the Go module:

```bash
cd farmgame
go mod init farmgame-build
go mod tidy
```

2. Update the placeholder constants in `build.go`:

```go
const (
    gitHubRepo   = "https://<USERNAME>:<ACCESS_TOKEN>@github.com/<USERNAME>/<REPO>.git"
    gitBranch    = "main"
    cnameDomain  = "example.com"       // set to "" to skip CNAME creation
    webDeployDir = "..\\farmgame-web"  // path to the git repo for deployment
)
```

3. Set the GitHub access token environment variable:

```bash
set GITHUB_ACCESS_TOKEN=your_token_here
```

## Usage

Run all steps (build, process, upload):

```bash
go run build.go
```

### Flags

| Flag         | Default | Description                              |
|--------------|---------|------------------------------------------|
| `--build`    | `true`  | Run `npm run build` (Vite build)         |
| `--process`  | `true`  | Minify, compress, and obfuscate files    |
| `--upload`   | `true`  | Push to GitHub                           |
| `--validate` | `false` | Prompt for confirmation before uploading |

### Examples

Build and process only (no upload):

```bash
go run build.go --upload=false
```

Process and upload only (skip build):

```bash
go run build.go --build=false
```

Process only (skip build and upload):

```bash
go run build.go --build=false --upload=false
```

Upload with confirmation prompt:

```bash
go run build.go --build=false --process=false --validate
```

## Pipeline

```
build/          deploy/          farmgame-web/        GitHub
(vite output) -> (optimized) ---> (git repo)  ------> (remote)
```

### Step 1: Build

Runs `npm run build` which triggers Vite to compile the React app into the `build/` directory.

### Step 2: Process & Obfuscate

Walks every file in `build/` and writes an optimized version to `deploy/`:

| File Type | Tool              | Action                             |
|-----------|-------------------|------------------------------------|
| `.js`     | terser            | Minify (ES2015)                    |
| `.js`     | javascript-obfuscator | Obfuscate (queued, runs after minification) |
| `.mjs`    | terser + obfuscator | Same as `.js` with extension handling |
| `.css`    | clean-css         | Minify                             |
| `.html`   | html-minifier     | Remove comments, collapse whitespace |
| `.png`    | pngquant          | Lossy compression (quality 50-100) |
| `.jpg`    | mozjpeg           | Lossy compression                  |
| `.svg`    | svgo              | Optimize                           |
| `.gif`    | gifsicle          | Lossy compression (64 colors)      |
| `.map`    | -                 | Deleted (source maps removed)      |
| `.txt`    | -                 | LICENSE files deleted, others copied |
| Other     | -                 | Copied as-is                       |

File processing runs concurrently with up to 24 goroutines. Obfuscation runs as a second pass after all minification is complete.

If a processed file ends up larger than the original, the original is used instead.

### Step 3: Validate (optional)

If `--validate` is set, the script pauses and asks for confirmation before uploading.

### Step 4: Upload

1. Verifies critical files exist in `deploy/` (e.g., `index.html`)
2. Cleans the web deploy directory (preserving `.git/`)
3. Copies `deploy/` contents into the web deploy directory
4. Commits and force-pushes to GitHub

## Directory Structure

```
farmgame/
  build.go          # This build tool
  build/            # Vite build output (generated)
  deploy/           # Optimized files (generated)
  src/              # Source code
  public/           # Static assets
  index.html        # Entry HTML
  package.json
  vite.config.js
```
