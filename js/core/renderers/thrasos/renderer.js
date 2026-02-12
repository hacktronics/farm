/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.thrasos.Renderer"),goog.require("Blockly.blockRendering"),goog.require("Blockly.blockRendering.Renderer"),goog.require("Blockly.thrasos.RenderInfo"),goog.require("Blockly.utils.object"),goog.requireType("Blockly.BlockSvg"),Blockly.thrasos.Renderer=function(e){Blockly.thrasos.Renderer.superClass_.constructor.call(this,e)},Blockly.utils.object.inherits(Blockly.thrasos.Renderer,Blockly.blockRendering.Renderer),Blockly.thrasos.Renderer.prototype.makeRenderInfo_=function(e){return new Blockly.thrasos.RenderInfo(this,e)},Blockly.blockRendering.register("thrasos",Blockly.thrasos.Renderer);