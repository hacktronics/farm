/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.Marker"),goog.require("Blockly.ASTNode"),goog.requireType("Blockly.blockRendering.MarkerSvg"),Blockly.Marker=function(){this.colour=null,this.curNode_=null,this.drawer_=null,this.type="marker"},Blockly.Marker.prototype.setDrawer=function(r){this.drawer_=r},Blockly.Marker.prototype.getDrawer=function(){return this.drawer_},Blockly.Marker.prototype.getCurNode=function(){return this.curNode_},Blockly.Marker.prototype.setCurNode=function(r){var e=this.curNode_;this.curNode_=r,this.drawer_&&this.drawer_.draw(e,this.curNode_)},Blockly.Marker.prototype.draw=function(){this.drawer_&&this.drawer_.draw(this.curNode_,this.curNode_)},Blockly.Marker.prototype.hide=function(){this.drawer_&&this.drawer_.hide()},Blockly.Marker.prototype.dispose=function(){this.getDrawer()&&this.getDrawer().dispose()};