/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.VariableModel"),goog.require("Blockly.Events"),goog.require("Blockly.Events.VarCreate"),goog.require("Blockly.utils"),goog.requireType("Blockly.Workspace"),Blockly.VariableModel=function(e,o,l,i){this.workspace=e,this.name=o,this.type=l||"",this.id_=i||Blockly.utils.genUid(),Blockly.Events.fire(new(Blockly.Events.get(Blockly.Events.VAR_CREATE))(this))},Blockly.VariableModel.prototype.getId=function(){return this.id_},Blockly.VariableModel.compareByName=function(e,o){return e.name.localeCompare(o.name,void 0,{sensitivity:"base"})};