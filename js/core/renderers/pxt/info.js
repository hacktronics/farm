/**
 * @license
 * Copyright 2019 Google LLC
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
"use strict";goog.provide("Blockly.pxt.RenderInfo"),goog.require("Blockly.pxt.CollapsedInputRow"),goog.require("Blockly.utils.object"),goog.require("Blockly.zelos.RenderInfo"),Blockly.pxt.RenderInfo=function(o,l){Blockly.pxt.RenderInfo.superClass_.constructor.call(this,o,l)},Blockly.utils.object.inherits(Blockly.pxt.RenderInfo,Blockly.zelos.RenderInfo),Blockly.pxt.RenderInfo.prototype.addCollapsedRow_=function(o){return this.rows.push(o),o=new Blockly.pxt.CollapsedInputRow(this.constants_),this.inputRowNum_++,o.isCollapsedStack=!0,o.hasDummyInput=!0,o};