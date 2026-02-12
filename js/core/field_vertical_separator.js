/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Massachusetts Institute of Technology
 * https://developers.google.com/blockly/
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
"use strict";goog.provide("Blockly.FieldVerticalSeparator"),goog.require("Blockly.Field"),goog.require("Blockly.fieldRegistry"),goog.require("Blockly.utils.object"),goog.require("Blockly.utils.Size"),Blockly.FieldVerticalSeparator=function(){Blockly.FieldVerticalSeparator.superClass_.constructor.call(this)},Blockly.utils.object.inherits(Blockly.FieldVerticalSeparator,Blockly.Field),Blockly.FieldVerticalSeparator.fromJson=function(e){return new Blockly.FieldVerticalSeparator},Blockly.FieldVerticalSeparator.prototype.EDITABLE=!1,Blockly.FieldVerticalSeparator.prototype.initView=function(){var e=this.getConstants().ICON_SEPARATOR_HEIGHT;this.lineElement_=Blockly.utils.dom.createSvgElement("line",{stroke:this.sourceBlock_.style.colourSecondary,"stroke-linecap":"round",x1:0,y1:0,x2:0,y2:e},this.fieldGroup_),this.size_=new Blockly.utils.Size(1,e),this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_)},Blockly.FieldVerticalSeparator.prototype.setLineHeight=function(e){this.lineElement_.setAttribute("y2",e)},Blockly.FieldVerticalSeparator.prototype.dispose=function(){Blockly.utils.dom.removeNode(this.fieldGroup_),this.fieldGroup_=null,this.lineElement_=null},Blockly.FieldVerticalSeparator.prototype.getValue=function(){return null},Blockly.FieldVerticalSeparator.prototype.setValue=function(e){},Blockly.FieldVerticalSeparator.prototype.setText=function(e){},Blockly.FieldVerticalSeparator.prototype.render_=function(){},Blockly.FieldVerticalSeparator.prototype.updateWidth=function(){},Blockly.fieldRegistry.register("field_vertical_separator",Blockly.FieldVerticalSeparator);