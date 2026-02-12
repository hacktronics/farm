window.Blockly.JavaScript["start"] = function (block) {
  const code = "start();\n";
  return code;
};

window.Blockly.JavaScript["walk_steps"] = function (block) {
  const steps = window.Blockly.JavaScript.valueToCode(block, "Steps", window.Blockly.JavaScript.ORDER_ATOMIC);
  const code = `walkSteps(${steps});\n`;
  return code;
};

window.Blockly.JavaScript["turn"] = function (block) {
  const direction = block.getFieldValue("Direction");
  let code = "";
	switch (direction) {
		case "left":
			code = "turnLeft();\n";
			break;
		case "right":
			code = "turnRight();\n";
			break;
		default:
			code = "\n";
	}
  return code;
};

window.Blockly.JavaScript["turn_back"] = function (block) {
  const code = "turnBackward();\n";
  return code;
};

window.Blockly.JavaScript["remove_stones"] = function (block) {
  const code = "removeStones();\n";
  return code;
};

window.Blockly.JavaScript["fill_holes"] = function (block) {
  const code = "fillHoles();\n";
  return code;
};

window.Blockly.JavaScript["collect_corn"] = function (block) {
  const corn = window.Blockly.JavaScript.valueToCode(block, "Corn", window.Blockly.JavaScript.ORDER_ATOMIC);
  const code = `collectCorn(${corn});\n`;
  return code;
};

window.Blockly.JavaScript["collect_tomato"] = function (block) {
  const tomato = window.Blockly.JavaScript.valueToCode(block, "Tomato", window.Blockly.JavaScript.ORDER_ATOMIC);
  const code = `collectTomato(${tomato});\n`;
  return code;
};

window.Blockly.JavaScript["water_plant"] = function (block) {
  const code = "waterPlant();\n";
  return code;
};

window.Blockly.JavaScript["for_loop"] = function (block) {
	let repeats = "1";
  if (block.getField("Times")) {
    repeats = String(parseInt(block.getFieldValue("Times"), 10));
  } else {
    repeats = window.Blockly.JavaScript.valueToCode(block, "Times", window.Blockly.JavaScript.ORDER_ASSIGNMENT) || "1";
  }
  let branch = window.Blockly.JavaScript.statementToCode(block, "DO");
  branch = window.Blockly.JavaScript.addLoopTrap(branch, block);
  const loopVar = window.Blockly.JavaScript.nameDB_.getDistinctName("count", window.Blockly.Variables.NAME_TYPE);
  let endVar = repeats;
  let code = "";
  if (!repeats.match(/^\w+$/) && !window.Blockly.isNumber(repeats)) {
    endVar = window.Blockly.JavaScript.nameDB_.getDistinctName("repeat_end", window.Blockly.Variables.NAME_TYPE);
    code += `const ${endVar} = ${repeats};`;
  }
  code += `for (var ${loopVar} = 0; ${loopVar} < ${endVar}; ${loopVar}++) {\n${branch}}\n`;
  return code;
};
