/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Events.ThemeChange"),goog.require("Blockly.Events"),goog.require("Blockly.Events.UiBase"),goog.require("Blockly.registry"),goog.require("Blockly.utils.object"),Blockly.Events.ThemeChange=function(e,o){Blockly.Events.ThemeChange.superClass_.constructor.call(this,o),this.themeName=e},Blockly.utils.object.inherits(Blockly.Events.ThemeChange,Blockly.Events.UiBase),Blockly.Events.ThemeChange.prototype.type=Blockly.Events.THEME_CHANGE,Blockly.Events.ThemeChange.prototype.toJson=function(){var e=Blockly.Events.ThemeChange.superClass_.toJson.call(this);return e.themeName=this.themeName,e},Blockly.Events.ThemeChange.prototype.fromJson=function(e){Blockly.Events.ThemeChange.superClass_.fromJson.call(this,e),this.themeName=e.themeName},Blockly.registry.register(Blockly.registry.Type.EVENT,Blockly.Events.THEME_CHANGE,Blockly.Events.ThemeChange);