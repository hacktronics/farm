/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Lua.variables"),goog.require("Blockly.Lua"),Blockly.Lua.variables_get=function(l){return[Blockly.Lua.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),Blockly.Lua.ORDER_ATOMIC]},Blockly.Lua.variables_set=function(l){var e=Blockly.Lua.valueToCode(l,"VALUE",Blockly.Lua.ORDER_NONE)||"0";return Blockly.Lua.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME)+" = "+e+"\n"};