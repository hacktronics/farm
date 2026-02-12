/**
 * @license
 * Copyright 2014 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Dart.variables"),goog.require("Blockly.Dart"),Blockly.Dart.variables_get=function(l){return[Blockly.Dart.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME),Blockly.Dart.ORDER_ATOMIC]},Blockly.Dart.variables_set=function(l){var e=Blockly.Dart.valueToCode(l,"VALUE",Blockly.Dart.ORDER_ASSIGNMENT)||"0";return Blockly.Dart.nameDB_.getName(l.getFieldValue("VAR"),Blockly.VARIABLE_CATEGORY_NAME)+" = "+e+";\n"};