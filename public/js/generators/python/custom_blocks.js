Blockly.Python["start"] = function (block) {
  const code = "start()\n";
  return code;
};

Blockly.Python["walk_steps"] = function (block) {
  const steps = Blockly.Python.valueToCode(block, "Steps", Blockly.Python.ORDER_ATOMIC);
  const code = `walkSteps(${steps})\n`;
  return code;
};

Blockly.Python["turn"] = function (block) {
  const direction = block.getFieldValue("Direction");
  let code = "";
	switch (direction) {
		case "left":
			code = "turnLeft()\n";
			break;
		case "right":
			code = "turnRight()\n";
			break;
		default:
			code = "\n";
	}
  return code;
};

Blockly.Python["turn_back"] = function (block) {
  const code = "turnBackward()\n";
  return code;
};

Blockly.Python["remove_stones"] = function (block) {
  const code = "removeStones()\n";
  return code;
};

Blockly.Python["fill_holes"] = function (block) {
  const code = "fillHoles()\n";
  return code;
};

Blockly.Python["collect_corn"] = function (block) {
  const corn = Blockly.Python.valueToCode(block, "Corn", Blockly.Python.ORDER_ATOMIC);
  const code = `collectCorn(${corn})\n`;
  return code;
};

Blockly.Python["collect_tomato"] = function (block) {
  const tomato = Blockly.Python.valueToCode(block, "Tomato", Blockly.Python.ORDER_ATOMIC);
  const code = `collectTomato(${tomato})\n`;
  return code;
};

Blockly.Python["water_plant"] = function (block) {
  const code = "waterPlant()\n";
  return code;
};

Blockly.Python["for_loop"] = function (block) {
	let repeats = "1";
  if (block.getField("Times")) {
    repeats = String(parseInt(block.getFieldValue("Times"), 10));
  } else {
    repeats = Blockly.Python.valueToCode(block, "Times", Blockly.Python.ORDER_NONE) || "1";
  }
  let branch = Blockly.Python.statementToCode(block, "DO");
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  const loopVar = Blockly.Python.variableDB_.getDistinctName("count", Blockly.Variables.NAME_TYPE);
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = `int(${repeats})`;
  }
  const code = `for ${loopVar} in range(${repeats}):\n${branch}`;
  return code;
};
