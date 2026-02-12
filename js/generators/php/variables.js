/**
 * @license
 * Copyright 2015 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.PHP.variables"),goog.require("Blockly.PHP"),Blockly.PHP.variables_get=function(l){return[Blockly.PHP.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),Blockly.PHP.ORDER_ATOMIC]},Blockly.PHP.variables_set=function(l){var e=Blockly.PHP.valueToCode(l,"VALUE",Blockly.PHP.ORDER_ASSIGNMENT)||"0";return Blockly.PHP.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME)+" = "+e+";\n"};