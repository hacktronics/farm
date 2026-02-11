import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import { render } from "react-dom";
import AceEditor from "react-ace";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LoopIcon from '@mui/icons-material/Loop';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SettingsIcon from '@mui/icons-material/Settings';

import ace, {Ace} from 'ace-builds';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const langTools = ace.require("ace/ext/language_tools");
const jsMode = ace.require("ace/mode/javascript");

let wordList = [
  {
    "word": "start()",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "walkSteps(1)",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "turnLeft()",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "turnRight()",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "turnBackward()",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "collectCorn(1)",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "collectTomato(1)",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  },
  {
    "word": "waterPlant()",
    "freq": 24,
    "score": 300,
    "flags": "bc",
    "syllables": "1",
    "meta": "function"
  }
];

var codeCompleter = {
  getCompletions: (editor, session, pos, prefix, callback) => {
    if (prefix.length === 0) {
      callback(null, []);
      return
    }
    callback(null, wordList.map(function(ea) {
      return {
        name: ea.word,
        value: ea.word,
        score: ea.score,
        meta: ea.meta
      };
    }))
  }
}

langTools.addCompleter(codeCompleter);

function AceTextEditor({mode, programMode, code, onCodeChange}) {
  const aceRef = useRef(null);

  const insertFunctionCode = (funcCode) => {
    if(!aceRef.current) return;
    let cursorPos = aceRef.current.editor.getCursorPosition();
    let code = funcCode;
    if(funcCode === 'repeat') {
      if(mode === 'python') {
        code = 'for i in range(1):\n    ';
        cursorPos.column = 4;
      } else {
        code = 'for (let i = 0; i < 1; i++) {\n    \n}\n';
      }
      cursorPos.row += 1;
      cursorPos.column = 4;
    } else {
      if(funcCode === 'start' || funcCode === 'waterPlant' || funcCode === 'turnLeft' || funcCode === 'turnRight' || funcCode === 'turnBackward') {
        cursorPos.row += 1;
      }
      cursorPos.column = code.length + 1;
      code += "()";
      if (mode === 'javascript') {
        code = code + ";";
      }
      code += "\n";
    }
    aceRef.current.editor.insert(code);
    aceRef.current.editor.moveCursorTo(cursorPos.row,cursorPos.column);
  };

  const insertParamsCode = (funcCode) => {
    if(!aceRef.current) return;
    let cursorPos = aceRef.current.editor.getCursorPosition();
    let code = `"${funcCode}"`;
    cursorPos.column = cursorPos.column + code.length + 1;
    aceRef.current.editor.insert(code);
    aceRef.current.editor.moveCursorTo(cursorPos.row,cursorPos.column);
  };

  const [turnExpanded, setTurnExpanded] = useState(false);

  const handleTurnExpandClick = () => {
    setTurnExpanded(!turnExpanded);
  };

  const handleUndoClick = () => {
    if (aceRef) {
      const editor = aceRef.current?.editor;
      if(editor) {
        editor.undo();
      }
    }
  };

  const handleRedoClick = () => {
    if (aceRef) {
      const editor = aceRef.current?.editor;
      if(editor) {
        editor.redo();
      }
    }
  };

  useEffect(() => {
    if (aceRef) {
      const editor = aceRef.current?.editor;
      if(!editor) return;
      var session = editor.session;
      var rules = session.$mode.$highlightRules.getRules();
      for (var stateName in rules) {
        if (Object.prototype.hasOwnProperty.call(rules, stateName)) {
          rules[stateName].unshift({
            token: 'custom_token',
            regex: 'start'
          },{
            token: 'custom_token',
            regex: 'walkSteps'
          },{
            token: 'custom_token',
            regex: 'turnLeft'
          },{
            token: 'custom_token',
            regex: 'turnRight'
          },{
            token: 'custom_token',
            regex: 'turnBackward'
          },{
            token: 'custom_token',
            regex: 'collectCorn'
          },{
            token: 'custom_token',
            regex: 'collectTomato'
          },{
            token: 'custom_token',
            regex: 'waterPlant'
          });
        }
      };
      // force recreation of tokenizer
      session.$mode.$tokenizer = null;
      session.bgTokenizer.setTokenizer(session.$mode.getTokenizer());
      // force re-highlight whole document
      session.bgTokenizer.start(0);
    }
  }, []);

  return (
    <Box sx={{visibility: (programMode === mode) ? 'visible' : 'hidden'}} className="texteditor">
      <Box sx={{ width: '100%', maxWidth: 160, height: `calc(100vh - 67px)`, bgcolor: 'background.paper', color: "#FFF", visibility: (programMode === mode) ? 'visible' : 'hidden'}}>
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding disabled>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsRunIcon />
                </ListItemIcon>
                <ListItemText primary="Motion" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Start" onClick={e => insertFunctionCode("start")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Walk Steps" onClick={e => insertFunctionCode("walkSteps")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding  onClick={handleTurnExpandClick}>
              <ListItemButton>
                <ListItemText primary="Turn"/>
              </ListItemButton>
              <Box sx={{mr:1}}>
                {turnExpanded ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </ListItem>
            <Collapse in={turnExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Turn Left" onClick={e => insertFunctionCode("turnLeft")}  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Turn Right" onClick={e => insertFunctionCode("turnRight")} />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Turn Back" onClick={e => insertFunctionCode("turnBackward")} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Collect Corn" onClick={e => insertFunctionCode("collectCorn")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Collect Tomato" onClick={e => insertFunctionCode("collectTomato")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Water Plant" onClick={e => insertFunctionCode("waterPlant")} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding disabled>
              <ListItemButton>
                <ListItemIcon>
                  <LoopIcon />
                </ListItemIcon>
                <ListItemText primary="Loops" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Repeat" onClick={e => insertFunctionCode("repeat")} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Box sx={{display:"flex", width: "100%"}}>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"506px", height:"50px", bgcolor: 'background.paper', position: "absolute", left: "160px", top:"0px"}}>
          <Box sx={{display:"flex", justifyContent:"start", alignItems:"center", mx:1}}>
            <img width="22px" height="22px" src={mode === 'python' ? '/images/python.svg' : '/images/javascript.svg'} alt="{mode === 'python' ? 'Python' : 'JavaScript'}" />
            <Typography variant="body1" color="#FFF" sx={{mx:1}}>{mode === 'python' ? 'main.py' : 'main.js'}</Typography>
          </Box>
          <Box sx={{display:"flex", alignItems:"center", ml:"10px"}}>
            <IconButton aria-label="delete" sx={{mx:0.5}} onClick={handleUndoClick}>
              <UndoIcon />
            </IconButton>
            <IconButton aria-label="delete" sx={{mx:0.5}} onClick={handleRedoClick}>
              <RedoIcon />
            </IconButton>
            <IconButton aria-label="delete" sx={{mx:0.5, mr:1}}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>
        <AceEditor
          ref={aceRef}
          mode={mode}
          theme="monokai"
          value={code}
          onChange={onCodeChange}
          name="ace_editor"
          fontSize={20}
          editorProps={{ $blockScrolling: true }}
          style={{width:'506px', height:`calc(100vh - 65px)`, visibility:(programMode === mode) ? 'visible' : 'hidden'}}
          setOptions={{
            useWorker: false,
            enableEmmet: true,
            enableBasicAutocompletion: true,
            // enableSnippets: true,
            enableLiveAutocompletion: true
          }}
        />
      </Box>
    </Box>
  )
}

AceTextEditor.propTypes = {
  mode: PropTypes.string.isRequired,
  programMode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
}

export default AceTextEditor
