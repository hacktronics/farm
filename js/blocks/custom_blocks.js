let START = "start";
let WALK = "walk";
let TURN = "turn";
let TURN_BACK = "turn";
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

let DEFINE = "define";
let MY_FUNCTION = "perform task";

let gameLanguage = "en";
if (window.localStorage) {
  gameLanguage = localStorage.getItem("lang") || "en";
}

if(gameLanguage === "hi") {
  START = "शुरू";
  WALK = "चलो";
  TURN = "घुमो";
  TURN_BACK = "पीछे";
  RIGHT = "दाएँ";
  LEFT = "बाएं";
  BACKWARD = "घुमो";
  REPEAT = "दोहराएं";
  STEP = "कदम";
  FILL = "गड्ढे";
  REMOVE = "पत्थर";
  COLLECT = "इकट्ठा करें";
  WATER_PLANT = "पौधों को पानी दें";
  HOLES = "भरे";
  STONES = "हटाएं";
  DEFINE = "परिभाषित करें";
  MY_FUNCTION = "कार्य करो";
} else if(gameLanguage === "de") {
  START = "Start";
  WALK = "gehe";
  TURN = "drehe";
  TURN_BACK = "drehe";
  RIGHT = "rechts";
  LEFT = "links";
  BACKWARD = "zurück";
  REPEAT = "wiederhole";
  STEP = "Schritte";
  FILL = "fülle";
  REMOVE = "entferne";
  COLLECT = "sammle";
  WATER_PLANT = "Pflanze gießen";
  HOLES = "Löcher";
  STONES = "Steine";
  DEFINE = "definiere";
  MY_FUNCTION = "Aufgabe ausführen";
} else if(gameLanguage === "pt") {
  START = "iniciar";
  WALK = "andar";
  TURN = "virar";
  TURN_BACK = "virar";
  RIGHT = "direita";
  LEFT = "esquerda";
  BACKWARD = "para trás";
  REPEAT = "repetir";
  STEP = "passos";
  FILL = "preencher";
  REMOVE = "remover";
  COLLECT = "coletar";
  WATER_PLANT = "regar planta";
  HOLES = "buracos";
  STONES = "pedras";
  DEFINE = "definir";
  MY_FUNCTION = "realizar tarefa";
} else if(gameLanguage === "es") {
  START = "iniciar";
  WALK = "caminar";
  TURN = "girar";
  TURN_BACK = "girar";
  RIGHT = "derecha";
  LEFT = "izquierda";
  BACKWARD = "atrás";
  REPEAT = "repetir";
  STEP = "pasos";
  FILL = "llenar";
  REMOVE = "quitar";
  COLLECT = "recoger";
  WATER_PLANT = "regar planta";
  HOLES = "hoyos";
  STONES = "piedras";
  DEFINE = "definir";
  MY_FUNCTION = "realizar tarea";
} else if(gameLanguage === "fr") {
  START = "démarrer";
  WALK = "marcher";
  TURN = "tourner";
  TURN_BACK = "tourner";
  RIGHT = "droite";
  LEFT = "gauche";
  BACKWARD = "en arrière";
  REPEAT = "répéter";
  STEP = "pas";
  FILL = "remplir";
  REMOVE = "enlever";
  COLLECT = "récolter";
  WATER_PLANT = "arroser plante";
  HOLES = "trous";
  STONES = "pierres";
  DEFINE = "définir";
  MY_FUNCTION = "effectuer tâche";
} else if(gameLanguage === "ru") {
  START = "старт";
  WALK = "иди";
  TURN = "поверни";
  TURN_BACK = "поверни";
  RIGHT = "вправо";
  LEFT = "влево";
  BACKWARD = "назад";
  REPEAT = "повтори";
  STEP = "шагов";
  FILL = "засыпь";
  REMOVE = "убери";
  COLLECT = "собери";
  WATER_PLANT = "полей растение";
  HOLES = "ямы";
  STONES = "камни";
  DEFINE = "определи";
  MY_FUNCTION = "выполни задание";
} else if(gameLanguage === "id") {
  START = "mulai";
  WALK = "jalan";
  TURN = "belok";
  TURN_BACK = "belok";
  RIGHT = "kanan";
  LEFT = "kiri";
  BACKWARD = "balik";
  REPEAT = "ulangi";
  STEP = "langkah";
  FILL = "isi";
  REMOVE = "angkat";
  COLLECT = "kumpulkan";
  WATER_PLANT = "siram tanaman";
  HOLES = "lubang";
  STONES = "batu";
  DEFINE = "tentukan";
  MY_FUNCTION = "lakukan tugas";
} else if(gameLanguage === "ja") {
  START = "スタート";
  WALK = "あるく";
  TURN = "まがる";
  TURN_BACK = "うしろに";
  RIGHT = "みぎ";
  LEFT = "ひだり";
  BACKWARD = "もどる";
  REPEAT = "くりかえし";
  STEP = "ほ";
  FILL = "うめる";
  REMOVE = "どかす";
  COLLECT = "あつめる";
  WATER_PLANT = "みずやり";
  HOLES = "あな";
  STONES = "いし";
  DEFINE = "つくる";
  MY_FUNCTION = "タスクをする";
} else if(gameLanguage === "zh") {
  START = "开始";
  WALK = "走";
  TURN = "转";
  TURN_BACK = "向后";
  RIGHT = "右";
  LEFT = "左";
  BACKWARD = "转";
  REPEAT = "重复";
  STEP = "步";
  FILL = "填";
  REMOVE = "移除";
  COLLECT = "收集";
  WATER_PLANT = "浇水";
  HOLES = "坑";
  STONES = "石头";
  DEFINE = "定义";
  MY_FUNCTION = "执行任务";
}

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
      .appendField(TURN_BACK).setAlign(Blockly.ALIGN_CENTRE)
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

Blockly.Blocks["function_define"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(DEFINE)
      .appendField(MY_FUNCTION);
    this.appendStatementInput("STACK").setCheck(null);
    this.setColour("#FF6680");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.Blocks["function_call"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(MY_FUNCTION);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF6680");
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
