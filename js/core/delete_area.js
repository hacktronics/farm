/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.DeleteArea"),goog.require("Blockly.BlockSvg"),goog.require("Blockly.DragTarget"),goog.require("Blockly.IDeleteArea"),goog.requireType("Blockly.IDraggable"),Blockly.DeleteArea=function(){Blockly.DeleteArea.superClass_.constructor.call(this),this.wouldDelete_=!1},Blockly.utils.object.inherits(Blockly.DeleteArea,Blockly.DragTarget),Blockly.DeleteArea.prototype.wouldDelete=function(e,l){if(e instanceof Blockly.BlockSvg){var t=e,o=!t.getParent()&&t.isDeletable();this.updateWouldDelete_(o&&!l)}else this.updateWouldDelete_(e.isDeletable());return this.wouldDelete_},Blockly.DeleteArea.prototype.updateWouldDelete_=function(e){this.wouldDelete_=e};