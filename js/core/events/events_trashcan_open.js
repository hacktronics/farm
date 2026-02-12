/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Events.TrashcanOpen"),goog.require("Blockly.Events"),goog.require("Blockly.Events.UiBase"),goog.require("Blockly.registry"),goog.require("Blockly.utils.object"),Blockly.Events.TrashcanOpen=function(s,e){Blockly.Events.TrashcanOpen.superClass_.constructor.call(this,e),this.isOpen=s},Blockly.utils.object.inherits(Blockly.Events.TrashcanOpen,Blockly.Events.UiBase),Blockly.Events.TrashcanOpen.prototype.type=Blockly.Events.TRASHCAN_OPEN,Blockly.Events.TrashcanOpen.prototype.toJson=function(){var s=Blockly.Events.TrashcanOpen.superClass_.toJson.call(this);return s.isOpen=this.isOpen,s},Blockly.Events.TrashcanOpen.prototype.fromJson=function(s){Blockly.Events.TrashcanOpen.superClass_.fromJson.call(this,s),this.isOpen=s.isOpen},Blockly.registry.register(Blockly.registry.Type.EVENT,Blockly.Events.TRASHCAN_OPEN,Blockly.Events.TrashcanOpen);