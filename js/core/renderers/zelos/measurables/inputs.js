/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
goog.provide("Blockly.zelos.StatementInput"),goog.require("Blockly.blockRendering.StatementInput"),goog.require("Blockly.utils.object"),goog.requireType("Blockly.blockRendering.ConstantProvider"),goog.requireType("Blockly.Input"),Blockly.zelos.StatementInput=function(t,e){if(Blockly.zelos.StatementInput.superClass_.constructor.call(this,t,e),this.connectedBlock){for(var o=this.connectedBlock;o.getNextBlock();)o=o.getNextBlock();o.nextConnection||(this.height=this.connectedBlockHeight,this.connectedBottomNextConnection=!0)}},Blockly.utils.object.inherits(Blockly.zelos.StatementInput,Blockly.blockRendering.StatementInput);