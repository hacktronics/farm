/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.TabNavigateCursor"),goog.require("Blockly.ASTNode"),goog.require("Blockly.BasicCursor"),goog.require("Blockly.utils.object"),goog.requireType("Blockly.Field"),Blockly.TabNavigateCursor=function(){Blockly.TabNavigateCursor.superClass_.constructor.call(this)},Blockly.utils.object.inherits(Blockly.TabNavigateCursor,Blockly.BasicCursor),Blockly.TabNavigateCursor.prototype.validNode_=function(o){var l=!1,r=o&&o.getType();if(o){var e=o.getLocation();r==Blockly.ASTNode.types.FIELD&&e&&e.isTabNavigable()&&e.isClickable()&&(l=!0)}return l};