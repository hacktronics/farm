/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Events.Abstract"),goog.require("Blockly.Events"),goog.requireType("Blockly.Workspace"),Blockly.Events.Abstract=function(){this.isBlank=null,this.workspaceId=void 0,this.group=Blockly.Events.getGroup(),this.recordUndo=Blockly.Events.recordUndo},Blockly.Events.Abstract.prototype.isUiEvent=!1,Blockly.Events.Abstract.prototype.toJson=function(){var t={type:this.type};return this.group&&(t.group=this.group),t},Blockly.Events.Abstract.prototype.fromJson=function(t){this.isBlank=!1,this.group=t.group},Blockly.Events.Abstract.prototype.isNull=function(){return!1},Blockly.Events.Abstract.prototype.run=function(t){},Blockly.Events.Abstract.prototype.getEventWorkspace_=function(){if(this.workspaceId)var t=Blockly.Workspace.getById(this.workspaceId);if(!t)throw Error("Workspace is null. Event must have been generated from real Blockly events.");return t};