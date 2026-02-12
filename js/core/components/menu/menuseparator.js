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
"use strict";goog.provide("Blockly.MenuSeparator"),goog.require("Blockly.utils.aria"),goog.require("Blockly.utils.object"),Blockly.MenuSeparator=function(){this.element_=null,this.rightToLeft_=!1,this.colour_="#ddd"},Blockly.MenuSeparator.prototype.dispose=function(){this.element_=null},Blockly.MenuSeparator.prototype.getElement=function(){return this.element_},Blockly.MenuSeparator.prototype.getId=function(){return this.element_.id},Blockly.MenuSeparator.prototype.setRightToLeft=function(t){this.rightToLeft_=t},Blockly.MenuSeparator.prototype.setColour=function(t){this.colour_=t},Blockly.MenuSeparator.prototype.createDom=function(){var t=document.createElement("div");return t.id=Blockly.utils.IdGenerator.getNextUniqueId(),this.element_=t,t.className="goog-menuseparator "+(this.rightToLeft_?"goog-menuseparator-rtl ":""),t.style.borderColor=this.colour_,Blockly.utils.aria.setRole(t,Blockly.utils.aria.Role.SEPARATOR),Blockly.utils.aria.setState(t,Blockly.utils.aria.State.DISABLED,!0),t},Blockly.MenuSeparator.prototype.isEnabled=function(){return!1};