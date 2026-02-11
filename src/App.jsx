import './App.css';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import GameMaze from './components/GameMaze';
import HeaderAppBar from './components/AppBar';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HelpIcon from '@mui/icons-material/Help';
import AceTextEditor from './components/AceTextEditor';
import InfoDialog from './components/InfoDialog';
import ResultDialog from './components/ResultDialog';
import { useTranslation } from 'react-i18next';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

var highlightPause = false;
var jsInterpreter = null;
var workspace = null;
var setResultDialog = null;
var setGameResultFn = null;

const start = () => {
  console.log('start()');
  highlightPause = true;
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const walkSteps = (step) => {
  if(typeof step !== 'number') {
    step = parseInt(step, 10) || 0;
  }
  console.log('walkSteps(' + step + ')');
  highlightPause = true;
  if(window.walkSteps) {
    window.walkSteps(step);
  }
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      stepCode();
      resolve();
    }, 1000);
  });
};

const turnLeft = () => {
  highlightPause = true;
  if(window.turnLeft) {
    window.turnLeft();
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const turnRight = () => {
  highlightPause = true;
  if(window.turnRight) {
    window.turnRight();
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const turnBackward = () => {
  highlightPause = true;
  if(window.turnBackward) {
    window.turnBackward();
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const removeStones = () => {
  highlightPause = true;
  if(window.removeStones) {
    window.removeStones();
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const fillHoles = () => {
  highlightPause = true;
  if(window.fillHoles) {
    window.fillHoles();
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const collectCorn = (num) => {
  if(typeof num !== 'number') {
    num = parseInt(num, 10) || 0;
  }
  highlightPause = true;
  if(window.collectCorn) {
    window.collectCorn(num);
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const collectTomato = (num) => {
  if(typeof num !== 'number') {
    num = parseInt(num, 10) || 0;
  }
  highlightPause = true;
  if(window.collectTomato) {
    window.collectTomato(num);
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const waterPlant = () => {
  highlightPause = true;
  if(window.waterPlant) {
    window.waterPlant();
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const checkGameResult = () => {
  setTimeout(() => {
    const result = window.isLevelComplete && window.isLevelComplete() ? 'correct' : 'incorrect';
    if (setGameResultFn) setGameResultFn(result);
    if (setResultDialog) setResultDialog(true);
  }, 1000);
};

const resetStepUi = (clearOutput) => {
  if(!workspace) return;
  workspace.highlightBlock(null);
  highlightPause = false;
};

const highlightBlock = (id) => {
  if(!workspace) return;
  id = id ? id.toString() : '';
  workspace.highlightBlock(id);
  highlightPause = true;
  setTimeout(function() {
    stepCode();
  }, 1000);
}

const initApi = (interpreter, scope) => {
  let wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(start());
  };
  interpreter.setProperty(scope, 'start', interpreter.createNativeFunction(wrapper));

  wrapper = function(step) {
    return interpreter.createPrimitive(walkSteps(step));
  };
  interpreter.setProperty(scope, 'walkSteps', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(turnLeft());
  };
  interpreter.setProperty(scope, 'turnLeft', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(turnRight());
  };
  interpreter.setProperty(scope, 'turnRight', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(turnBackward());
  };
  interpreter.setProperty(scope, 'turnBackward', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(removeStones());
  };
  interpreter.setProperty(scope, 'removeStones', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(fillHoles());
  };
  interpreter.setProperty(scope, 'fillHoles', interpreter.createNativeFunction(wrapper));

  wrapper = function(num) {
    return interpreter.createPrimitive(collectCorn(parseInt(num, 10) || 0));
  };
  interpreter.setProperty(scope, 'collectCorn', interpreter.createNativeFunction(wrapper));

  wrapper = function(num) {
    return interpreter.createPrimitive(collectTomato(parseInt(num, 10) || 0));
  };
  interpreter.setProperty(scope, 'collectTomato', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(waterPlant());
  };
  interpreter.setProperty(scope, 'waterPlant', interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    return interpreter.createPrimitive(checkGameResult());
  };
  interpreter.setProperty(scope, 'checkGameResult', interpreter.createNativeFunction(wrapper));
}

const stepCode = () => {
  highlightPause = false;
  do {
    try {
      var hasMoreCode = jsInterpreter.step();
    } finally {
      if (!hasMoreCode) {
        jsInterpreter = null;
        resetStepUi(false);
        return;
      }
    }
    // Keep executing until a highlight statement is reached,
    // or the code completes or errors.
  } while (hasMoreCode && !highlightPause);
}

const outf = (text) => {
  // var mypre = document.getElementById("output");
  // mypre.innerHTML = mypre.innerHTML + text;
  console.log(text);
};

const builtinRead = (x) => {
  if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined) {
          // eslint-disable-next-line no-throw-literal
          throw "File not found: '" + x + "'";
  }
  return window.Sk.builtinFiles["files"][x];
};

function App() {
  const { t, i18n } = useTranslation();
  const [programMode, setProgramMode] = useState('blocks');
  const [lang, setLanguage] = useState('en');
  const [blocklyWorkspace, setBlocklyWorkspace] = useState(null);
  const [jsCode, setJSCode] = useState('');
  const [pyCode, setPYCode] = useState('');
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [gameResult, setGameResult] = useState('correct');
  const [gameLevel, setGameLevel] = useState(1);
  const [volumeMute, setVolumeMute] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/sounds/farm-ambience.mp3');
    audio.loop = true;
    audio.volume = 0.1;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    // Try to play immediately; if blocked by autoplay policy, play on first user interaction
    tryPlay();
    const handleInteraction = () => {
      if (audio.paused) {
        tryPlay();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      audio.pause();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = volumeMute;
    }
  }, [volumeMute]);

  const onGameLevelChange = (event, level) => {
    setIsRunning(false);
    setGameLevel(level);
    if(window.resetGame) {
      window.resetGame();
    }
  };

  useEffect(() => {
    if (window.localStorage) {
      const lang = localStorage.getItem('lang');
      if (lang) {
        setLanguage(lang);
        i18n.changeLanguage(lang);
      }
    }
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    if(window.localStorage) {
      localStorage.setItem('lang', lang);
    }
    setLanguage(lang);
    window.location.reload();
  };

  const loadBlocklyWorkspace = useCallback(() => {
    if(workspace) {
      setBlocklyWorkspace(workspace);
      return;
    }
    const toolbox = document.getElementById('toolbox-categories');
    if(!toolbox || !window.Blockly) return;
    const bWorkspace = window.Blockly.inject('blocklyDiv',
      {
        comments: true,
        collapse: true,
        disable: true,
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        horizontalLayout: false,
        maxBlocks: Infinity,
        maxInstances: {'test_basic_limit_instances': 3},
        maxTrashcanContents: 256,
        media: '../media/',
        oneBasedIndex: true,
        readOnly: false,
        rtl: false,
        move: {
          scrollbars: true,
          drag: true,
          wheel: true,
        },
        theme: window.Blockly.Themes.Modern,
        toolbox: toolbox,
        toolboxPosition: 'start',
        renderer: 'pxt',
        zoom:
          {
            controls: true,
            wheel: false,
            startScale: 1.0,
            maxScale: 4,
            minScale: 0.25,
            scaleSpeed: 1.1
          }
      });
    setBlocklyWorkspace(bWorkspace);
    workspace = bWorkspace;
    window.workspace = bWorkspace;
    if (typeof window.toolboxTestBlocksInit !== 'undefined') {
      window.toolboxTestBlocksInit(bWorkspace);
    }
  }, []);

  const handleJSCodeChange = (code) => {
    setJSCode(code);
  };

  const handlePYCodeChange = (code) => {
    setPYCode(code);
  };

  const handleProgramModeChange = (mode) => {
    if(blocklyWorkspace && programMode === 'blocks' && programMode !== mode) {
      window.Blockly.JavaScript.STATEMENT_PREFIX = "";
      const jsCode = window.Blockly.JavaScript.workspaceToCode(blocklyWorkspace.current);
      const pyCode = window.Blockly.Python.workspaceToCode(blocklyWorkspace.current);
      setJSCode(jsCode);
      setPYCode(pyCode);
    }
    setProgramMode(mode);
  };

  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    loadBlocklyWorkspace();
    setResultDialog = setOpenResultDialog;
    setGameResultFn = setGameResult;
  }, [loadBlocklyWorkspace]);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const fabRunStyle = {
    position: 'absolute',
    left: 621,
    top: '46%',
    backgroundColor: '#92B129',
    color: 'white',
    width:'88px',
    height:'88px'
  };
  const fabHelpStyle = {
    position: 'absolute',
    bottom: 32,
    right: 32,
    backgroundColor: '#92B129',
    color: 'white',
    width:'48px',
    height:'48px'
  };

  const generateCodeAndLoadIntoInterpreter = () => {
    let code = '';
    if(programMode === 'blocks') {
      window.Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      window.Blockly.JavaScript.addReservedWords('highlightBlock');
      code = window.Blockly.JavaScript.workspaceToCode(workspace);
    } else if(programMode === 'javascript') {
      code = jsCode;
    } else if(programMode === 'python') {
      code = pyCode;
      // eval(window.__BRYTHON__.python_to_js("import browser; browser.console.log('Hello Brython!')"));
      window.Sk.pre = "output";
      window.Sk.configure({output:outf, read:builtinRead});
      window.Sk.builtins.start = new window.Sk.builtin.func(function () {
        start();
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.walkSteps = new window.Sk.builtin.func(function (steps) {
        return new window.Sk.misceval.promiseToSuspension(walkSteps(steps).then(() => window.Sk.builtin.none.none$));
      });
      window.Sk.builtins.turnLeft = new window.Sk.builtin.func(function () {
        turnLeft();
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.turnRight = new window.Sk.builtin.func(function () {
        turnRight();
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.turnBackward = new window.Sk.builtin.func(function () {
        turnBackward();
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.removeStones = new window.Sk.builtin.func(function () {
        removeStones();
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.fillHoles = new window.Sk.builtin.func(function () {
        fillHoles();
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.collectCorn = new window.Sk.builtin.func(function (num) {
        collectCorn(num);
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.collectTomato = new window.Sk.builtin.func(function (num) {
        collectTomato(num);
        return window.Sk.builtin.none.none$;
      });
      window.Sk.builtins.waterPlant = new window.Sk.builtin.func(function () {
        waterPlant();
        return window.Sk.builtin.none.none$;
      });
      const pyPromise = window.Sk.misceval.asyncToPromise(function() {
          return window.Sk.importMainWithBody("<stdin>", false, code, true);
      });
      pyPromise.then(
        function(mod) {
          console.log('success');
        },
        function(err) {
          console.log(err.toString());
        }
      );
      return;
    }
    code += 'checkGameResult();\n';
    resetStepUi(true);
    jsInterpreter = new window.Interpreter(code, initApi);
    setTimeout(function() {
      highlightPause = true;
      stepCode();
    }, 1);
  };

  const [isRunning, setIsRunning] = useState(false);
  const runCode = () => {
    if(isRunning) {
      setIsRunning(false);
      if(window.resetGame) {
        window.resetGame();
      }
      return;
    } else {
      setIsRunning(true);
      generateCodeAndLoadIntoInterpreter();
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderAppBar
            programMode={programMode}
            setProgramMode={handleProgramModeChange}
            gameLevel={gameLevel}
            onGameLevelChange={onGameLevelChange}
            onLanguageChange={handleLanguageChange}
            volumeMute={volumeMute}
            onVolumeToggle={() => setVolumeMute(m => !m)}
          />
          <GameMaze level={gameLevel - 1}/>
          <div id="blocklyDiv" style={{visibility: (programMode === 'blocks') ? 'visible' : 'hidden'}}></div>
          <AceTextEditor mode={'javascript'} programMode={programMode} code={jsCode} onCodeChange={handleJSCodeChange}/>
          <AceTextEditor mode={'python'} programMode={programMode} code={pyCode} onCodeChange={handlePYCodeChange}/>
          <Zoom
            key={'fabRunBtn'}
            in={true}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${transitionDuration.exit}ms`,
            }}
            unmountOnExit
          >
            <Fab sx={fabRunStyle} aria-label={"Run Code"} color={'success'} size="large" onClick={runCode} >
              {
                isRunning && <RestartAltIcon size="large" sx={{width:'96px', height:'96px'}} />
              }
              {
                !isRunning && <PlayCircleIcon size="large" sx={{width:'96px', height:'96px'}} />
              }
            </Fab>
          </Zoom>
          <Zoom
            key={'fabHelpBtn'}
            in={true}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${transitionDuration.exit}ms`,
            }}
            unmountOnExit
          >
            <Fab sx={fabHelpStyle} aria-label={"Hint"} color={'success'} size="large" onClick={() => setOpenInfoDialog(true)}>
              <HelpIcon size="large" sx={{width:'48px', height:'48px'}} />
            </Fab>
          </Zoom>
          <InfoDialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)} />
          <ResultDialog open={openResultDialog} onClose={() => setOpenResultDialog(false)} result={gameResult}/>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
