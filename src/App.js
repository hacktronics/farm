import './App.css';
import React, {useState, useEffect} from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import GameMaze from './components/GameMaze';
import HeaderAppBar from './components/AppBar';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import HelpIcon from '@mui/icons-material/Help';
import AceTextEditor from './components/AceTextEditor';
import InfoDialog from './components/InfoDialog';
import ResultDialog from './components/ResultDialog';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

var highlightPause = false;
var jsInterpreter = null;
var workspace = null;
var hasMoreCode = false;
var setResultDialog = null;

const start = () => {
  console.log('start()');
  highlightPause = true;
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const walkSteps = (step) => {
  console.log('walkSteps(' + step + ')');
  highlightPause = true;
  if(window.movePlayer && window.playerPos) {
    const pos = window.playerPos + step;
    window.movePlayer(pos);
    if(pos === 3) {
      setTimeout(function() {
        setResultDialog(true);
      }, 1000);
    }
  }
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const turnLeft = () => {
  console.log('turnLeft()');
  highlightPause = true;
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const turnRight = () => {
  console.log('turnRight()');
  highlightPause = true;
  setTimeout(function() {
    stepCode();
  }, 1000);
};

const resetStepUi = (clearOutput) => {
  if(!workspace) return;
  workspace.highlightBlock(null);
  highlightPause = false;
};

const highlightBlock = (id) => {
  if(!workspace) return;
  console.log('highlightBlock(' + id + ')');
  id = id ? id.toString() : '';
  workspace.highlightBlock(id);
  highlightPause = true;
  setTimeout(function() {
    stepCode();
  }, 1000);
}

const initApi = (interpreter, scope) => {
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(start());
  };
  interpreter.setProperty(scope, 'start',
      interpreter.createNativeFunction(wrapper));

  var wrapper = function(step) {
    return interpreter.createPrimitive(walkSteps(step));
  };
  interpreter.setProperty(scope, 'walkSteps',
      interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(turnLeft());
  };
  interpreter.setProperty(scope, 'turnLeft',
      interpreter.createNativeFunction(wrapper));

  var wrapper = function() {
    return interpreter.createPrimitive(turnRight());
  };
  interpreter.setProperty(scope, 'turnRight',
      interpreter.createNativeFunction(wrapper));
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

const generateCodeAndLoadIntoInterpreter = () => {
  window.Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  window.Blockly.JavaScript.addReservedWords('highlightBlock');
  const code = window.Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code);
  resetStepUi(true);
  jsInterpreter = new window.Interpreter(code, initApi);
  setTimeout(function() {
    highlightPause = true;
    stepCode();
  }, 1);
};

function App() {
  const [programMode, setProgramMode] = useState('blocks');
  const [blocklyWorkspace, setBlocklyWorkspace] = useState(null);
  const [jsCode, setJSCode] = useState('');
  const [pyCode, setPYCode] = useState('');
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);

  const onGameLevelChange = (event, level) => {
    setGameLevel(level);
  };

  const loadBlocklyWorkspace = () => {
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
  }

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
      console.log(jsCode);
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
  }, []);

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


  const [isRunning, setIsRunning] = useState(false);
  const runCode = () => {
    if(isRunning) {
      setIsRunning(false);
      if(window.movePlayer) {
        window.movePlayer(1);
      }
      return;
    }
    setIsRunning(true);
    generateCodeAndLoadIntoInterpreter();
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderAppBar programMode={programMode} setProgramMode={handleProgramModeChange} gameLevel={gameLevel} onGameLevelChange={onGameLevelChange} />
          <GameMaze level={gameLevel}/>
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
          <ResultDialog open={openResultDialog} onClose={() => setOpenResultDialog(false)} result={"correct"}/>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
