window.Blockly.Python["start"] = function (block) {
  const code = "start()\n";
  return code;
};

window.Blockly.Python["walk_steps"] = function (block) {
  const steps = window.Blockly.Python.valueToCode(block, "Steps", Blockly.Python.ORDER_ATOMIC);
  const code = `walk_steps(${steps})\n`;
  return code;
};

window.Blockly.Python["turn"] = function (block) {
  const direction = block.getFieldValue("Direction");
  let code = "";
	switch (direction) {
		case "left":
			code = "turn_left()\n";
			break;
		case "right":
			code = "turn_right()\n";
			break;
		default:
			code = "\n";
	}
  return code;
};

window.Blockly.Python["turn_back"] = function (block) {
  const code = "turn_backward()\n";
  return code;
};

window.Blockly.Python["remove_stones"] = function (block) {
  const code = "remove_stones()\n";
  return code;
};

window.Blockly.Python["fill_holes"] = function (block) {
  const code = "fill_holes()\n";
  return code;
};

window.Blockly.Python["collect_corn"] = function (block) {
  const corn = window.Blockly.Python.valueToCode(block, "Corn", window.Blockly.Python.ORDER_ATOMIC);
  const code = `collect_corn(${corn})\n`;
  return code;
};

window.Blockly.Python["collect_tomato"] = function (block) {
  const tomato = window.Blockly.Python.valueToCode(block, "Tomato", window.Blockly.Python.ORDER_ATOMIC);
  const code = `collect_tomato(${tomato})\n`;
  return code;
};

window.Blockly.Python["water_plant"] = function (block) {
  const code = "water_plant()\n";
  return code;
};

window.Blockly.Python["function_define"] = function (block) {
  let branch = window.Blockly.Python.statementToCode(block, "STACK");
  branch = branch || window.Blockly.Python.PASS;
  const code = `def perform_task():\n${branch}`;
  return code;
};

window.Blockly.Python["function_call"] = function (block) {
  const code = "perform_task()\n";
  return code;
};

window.Blockly.Python["for_loop"] = function (block) {
	let repeats = "1";
  if (block.getField("Times")) {
    repeats = String(parseInt(block.getFieldValue("Times"), 10));
  } else {
    repeats = window.Blockly.Python.valueToCode(block, "Times", window.Blockly.Python.ORDER_NONE) || "1";
  }
  let branch = window.Blockly.Python.statementToCode(block, "DO");
  branch = window.Blockly.Python.addLoopTrap(branch, block) || window.Blockly.Python.PASS;
  const loopVar = window.Blockly.Python.nameDB_.getDistinctName("count", window.Blockly.Variables.NAME_TYPE);
  if (window.Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = `int(${repeats})`;
  }
  const code = `for ${loopVar} in range(${repeats}):\n${branch}`;
  return code;
};
