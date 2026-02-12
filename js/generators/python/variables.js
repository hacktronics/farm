/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Python.variables"),goog.require("Blockly.Python"),Blockly.Python.variables_get=function(l){return[Blockly.Python.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),Blockly.Python.ORDER_ATOMIC]},Blockly.Python.variables_set=function(l){var o=Blockly.Python.valueToCode(l,"VALUE",Blockly.Python.ORDER_NONE)||"0";return Blockly.Python.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME)+" = "+o+"\n"};