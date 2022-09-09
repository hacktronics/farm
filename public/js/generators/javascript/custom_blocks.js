Blockly.JavaScript["start"] = function (block) {
  const code = "start();\n";
  return code;
};

Blockly.JavaScript["walk_steps"] = function (block) {
  const steps = Blockly.JavaScript.valueToCode(block, "Steps", Blockly.JavaScript.ORDER_ATOMIC);
  const code = `walkSteps(${steps});\n`;
  return code;
};

Blockly.JavaScript["turn"] = function (block) {
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

Blockly.JavaScript["turn_back"] = function (block) {
  const code = "turnBackward();\n";
  return code;
};

Blockly.JavaScript["remove_stones"] = function (block) {
  const code = "removeStones();\n";
  return code;
};

Blockly.JavaScript["fill_holes"] = function (block) {
  const code = "fillHoles();\n";
  return code;
};

Blockly.JavaScript["collect_corn"] = function (block) {
  const corn = Blockly.JavaScript.valueToCode(block, "Corn", Blockly.JavaScript.ORDER_ATOMIC);
  const code = `collectCorn(${corn});\n`;
  return code;
};

Blockly.JavaScript["collect_tomato"] = function (block) {
  const tomato = Blockly.JavaScript.valueToCode(block, "Tomato", Blockly.JavaScript.ORDER_ATOMIC);
  const code = `collectTomato(${tomato});\n`;
  return code;
};

Blockly.JavaScript["water_plant"] = function (block) {
  const code = "waterPlant();\n";
  return code;
};

Blockly.JavaScript["for_loop"] = function (block) {
	let repeats = "1";
  if (block.getField("Times")) {
    repeats = String(parseInt(block.getFieldValue("Times"), 10));
  } else {
    repeats = Blockly.JavaScript.valueToCode(block, "Times", Blockly.JavaScript.ORDER_ASSIGNMENT) || "1";
  }
  let branch = Blockly.JavaScript.statementToCode(block, "DO");
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  const loopVar = Blockly.JavaScript.variableDB_.getDistinctName("count", Blockly.Variables.NAME_TYPE);
  let endVar = repeats;
  let code = "";
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    endVar = Blockly.JavaScript.variableDB_.getDistinctName("repeat_end", Blockly.Variables.NAME_TYPE);
    code += `const ${endVar} = ${repeats};`;
  }
  code += `for (let ${loopVar} = 0; ${loopVar} < ${endVar}; ${loopVar}++) {\n${branch}}\n`;
  return code;
};
