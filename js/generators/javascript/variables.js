/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.JavaScript.variables"),goog.require("Blockly.JavaScript"),Blockly.JavaScript.variables_get=function(a){return[Blockly.JavaScript.nameDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),Blockly.JavaScript.ORDER_ATOMIC]},Blockly.JavaScript.variables_set=function(a){var l=Blockly.JavaScript.valueToCode(a,"VALUE",Blockly.JavaScript.ORDER_ASSIGNMENT)||"0";return Blockly.JavaScript.nameDB_.getName(a.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME)+" = "+l+";\n"};