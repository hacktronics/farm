/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";goog.provide("Blockly.pxt.Renderer"),goog.require("Blockly.blockRendering"),goog.require("Blockly.utils.object"),goog.require("Blockly.pxt.ConstantProvider"),goog.require("Blockly.pxt.PathObject"),goog.require("Blockly.pxt.Drawer"),goog.require("Blockly.pxt.RenderInfo"),goog.require("Blockly.zelos.Renderer"),Blockly.pxt.Renderer=function(e){Blockly.zelos.Renderer.superClass_.constructor.call(this,e)},Blockly.utils.object.inherits(Blockly.pxt.Renderer,Blockly.zelos.Renderer),Blockly.pxt.Renderer.prototype.makePathObject=function(e,o){return new Blockly.pxt.PathObject(e,o,this.getConstants())},Blockly.pxt.Renderer.prototype.makeRenderInfo_=function(e){return new Blockly.pxt.RenderInfo(this,e)},Blockly.pxt.Renderer.prototype.makeDrawer_=function(e,o){return new Blockly.pxt.Drawer(e,o)},Blockly.pxt.Renderer.prototype.makeConstants_=function(){return new Blockly.pxt.ConstantProvider},Blockly.blockRendering.register("pxt",Blockly.pxt.Renderer);