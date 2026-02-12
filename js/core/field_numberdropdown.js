/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
"use strict";goog.provide("Blockly.FieldNumberDropdown"),goog.require("Blockly.FieldTextDropdown"),goog.require("Blockly.fieldRegistry"),goog.require("Blockly.utils.object"),goog.require("Blockly.utils.userAgent"),Blockly.FieldNumberDropdown=function(o,e,l,r,t,i){this.setConstraints=Blockly.FieldNumber.prototype.setConstraints,this.setMinInternal_=Blockly.FieldNumber.prototype.setMinInternal_,this.setMaxInternal_=Blockly.FieldNumber.prototype.setMaxInternal_,this.setPrecisionInternal_=Blockly.FieldNumber.prototype.setPrecisionInternal_;var n=Blockly.FieldNumber.prototype.getNumRestrictor.call(this,l,r,t);Blockly.FieldNumberDropdown.superClass_.constructor.call(this,o,e,i,n),this.addArgType("numberdropdown")},Blockly.utils.object.inherits(Blockly.FieldNumberDropdown,Blockly.FieldTextDropdown),Blockly.FieldNumberDropdown.fromJson=function(o){return new Blockly.FieldNumberDropdown(o.value,o.options,o.min,o.max,o.precision)},Blockly.FieldNumberDropdown.prototype.classValidator=Blockly.FieldNumber.prototype.classValidator,Blockly.fieldRegistry.register("field_numberdropdown",Blockly.FieldNumberDropdown);