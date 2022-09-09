let START = "start";
let WALK = "walk";
let TURN = "turn";
let RIGHT = "right";
let LEFT = "left";
let BACKWARD = "backward";
let REPEAT = "repeat";
let STEP = "step";
let FILL = "fill";
let REMOVE = "remove";
let COLLECT = "collect";
let WATER_PLANT = "water plant";
let HOLES = "holes";
let STONES = "stones";

Blockly.Blocks["start"] = {
  init: function () {
    this.appendDummyInput().appendField(START).setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage("images/flag-checkered.svg", 28, 28, "flag-checkered"));
    this.setNextStatement(true);
    this.setColour("#FFBF00");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["walk_steps"] = {
  init: function () {
    this.appendValueInput("Steps").setCheck("Number").setAlign(Blockly.ALIGN_CENTRE)
      .appendField(WALK)
      .appendField(new Blockly.FieldImage("images/shoe-prints.svg", 32, 32, "shoe-prints"));
    this.appendDummyInput().appendField(STEP);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["turn"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(TURN)
      .appendField(new Blockly.FieldImage("images/turn-left.svg", 28, 28, "turn-left"))
      .appendField(new Blockly.FieldImage("images/turn-right.svg", 28, 28, "turn-right"))
      .appendField(
        new Blockly.FieldDropdown([
          [LEFT, "left"],
          [RIGHT, "right"],
        ]),
        "Direction"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["turn_back"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(TURN).setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage("images/u-turn.svg", 30, 30, "u-turn"))
      .appendField(BACKWARD).setAlign(Blockly.ALIGN_CENTRE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["remove_stones"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(REMOVE).setAlign(Blockly.ALIGN_CENTRE)
      .appendField(STONES).setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage("images/shovel.svg", 30, 30, "shovel"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["fill_holes"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(FILL).setAlign(Blockly.ALIGN_CENTRE)
      .appendField(HOLES).setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldImage("images/wheel-barrow.svg", 30, 30, "wheel-barrow"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true);
    this.setColour("#4C97FF");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["collect_corn"] = {
  init: function () {
    this.appendValueInput("Corn").setCheck("Number").setAlign(Blockly.ALIGN_CENTRE)
      .appendField(COLLECT);
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("images/corn.svg", 30, 30, "corn"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["collect_tomato"] = {
  init: function () {
    this.appendValueInput("Tomato").setCheck("Number").setAlign(Blockly.ALIGN_CENTRE)
      .appendField(COLLECT);
    this.appendDummyInput()
      .appendField(new Blockly.FieldImage("images/tomato.svg", 30, 30, "tomato"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#59C059");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["water_plant"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(WATER_PLANT)
      .appendField(new Blockly.FieldImage("images/watering-can.svg", 36, 30, "water"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0FBD8C");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["for_loop"] = {
  init: function () {
    this.appendValueInput("Times").setCheck("Number").setAlign(Blockly.ALIGN_CENTRE)
      .appendField(REPEAT)
      .appendField(new Blockly.FieldImage("images/repeat.svg", 30, 30, "repeat"));
    this.setInputsInline(true);
    this.appendStatementInput("DO").setCheck(null).appendField("");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#ffab19");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
