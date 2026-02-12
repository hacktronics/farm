/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.minimalist"),goog.provide("Blockly.minimalist.RenderInfo"),goog.require("Blockly.utils.object"),Blockly.minimalist.RenderInfo=function(e,o){Blockly.minimalist.RenderInfo.superClass_.constructor.call(this,e,o)},Blockly.utils.object.inherits(Blockly.minimalist.RenderInfo,Blockly.blockRendering.RenderInfo),Blockly.minimalist.RenderInfo.prototype.getRenderer=function(){return this.renderer_};