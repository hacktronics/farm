/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
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
"use strict";goog.provide("Blockly.FieldLabelHover"),goog.require("Blockly.FieldLabel"),goog.require("Blockly.utils.object"),Blockly.FieldLabelHover=function(e,l){Blockly.FieldLabelHover.superClass_.constructor.call(this,e,l),this.arrowWidth_=0},Blockly.utils.object.inherits(Blockly.FieldLabelHover,Blockly.FieldLabel),Blockly.FieldLabelHover.prototype.initView=function(){Blockly.FieldLabelHover.superClass_.initView.call(this),this.sourceBlock_.isEditable()&&(this.mouseOverWrapper_=Blockly.bindEvent_(this.getClickTarget_(),"mouseover",this,this.onMouseOver_),this.mouseOutWrapper_=Blockly.bindEvent_(this.getClickTarget_(),"mouseout",this,this.onMouseOut_))},Blockly.FieldLabelHover.fromJson=function(e){var l=Blockly.utils.replaceMessageReferences(e.text);return new Blockly.FieldLabelHover(l,e.class)},Blockly.FieldLabelHover.prototype.EDITABLE=!1,Blockly.FieldLabelHover.prototype.SERIALIZABLE=!0,Blockly.FieldLabelHover.prototype.updateWidth=function(){this.size_.width=Blockly.utils.dom.getFastTextWidth(this.textElement_,this.getConstants().FIELD_TEXT_FONTSIZE,this.getConstants().FIELD_TEXT_FONTWEIGHT,this.getConstants().FIELD_TEXT_FONTFAMILY)},Blockly.FieldLabelHover.prototype.onMouseOver_=function(e){if(!this.sourceBlock_.isInFlyout&&this.sourceBlock_.isShadow()){var l=this.sourceBlock_.workspace.getGesture(e);l&&l.isDragging()||this.sourceBlock_.pathObject.svgPath&&(Blockly.utils.dom.addClass(this.sourceBlock_.pathObject.svgPath,"blocklyFieldHover"),this.sourceBlock_.pathObject.svgPath.style.strokeDasharray="2")}},Blockly.FieldLabelHover.prototype.clearHover=function(){this.sourceBlock_.pathObject.svgPath&&(Blockly.utils.dom.removeClass(this.sourceBlock_.pathObject.svgPath,"blocklyFieldHover"),this.sourceBlock_.pathObject.svgPath.style.strokeDasharray="")},Blockly.FieldLabelHover.prototype.onMouseOut_=function(e){if(!this.sourceBlock_.isInFlyout&&this.sourceBlock_.isShadow()){var l=this.sourceBlock_.workspace.getGesture(e);l&&l.isDragging()||this.clearHover()}},Blockly.FieldLabelHover.dispose=function(){this.mouseOverWrapper_&&(Blockly.unbindEvent_(this.mouseOverWrapper_),this.mouseOverWrapper_=null),this.mouseOutWrapper_&&(Blockly.unbindEvent_(this.mouseOutWrapper_),this.mouseOutWrapper_=null),Blockly.FieldLabelHover.superClass_.dispose.call(this),this.workspace_=null,this.variableMap_=null},Blockly.fieldRegistry.register("field_label_hover",Blockly.FieldLabelHover);