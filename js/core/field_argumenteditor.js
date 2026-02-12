/**
 * @license
 * PXT Blockly fork
 *
 * The MIT License (MIT)
 *
 * Copyright (c) Microsoft Corporation
 *
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
"use strict";goog.provide("Blockly.FieldArgumentEditor"),goog.require("Blockly.Colours"),goog.require("Blockly.fieldRegistry"),goog.require("Blockly.FieldTextInput"),goog.require("Blockly.Msg"),goog.require("Blockly.utils"),goog.require("Blockly.utils.object"),Blockly.FieldArgumentEditor=function(e,t,o){Blockly.FieldArgumentEditor.superClass_.constructor.call(this,e,t,o)},Blockly.utils.object.inherits(Blockly.FieldArgumentEditor,Blockly.FieldTextInput),Blockly.FieldArgumentEditor.REMOVE_ARG_URI="data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0' encoding='UTF-8' standalone='no'?%3e%3csvg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3c!-- Generator: Sketch 48.1 (47250) - http://www.bohemiancoding.com/sketch --%3e%3ctitle%3edelete-argument v2%3c/title%3e%3cdesc%3eCreated with Sketch.%3c/desc%3e%3cdefs%3e%3c/defs%3e%3cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e%3cg id='delete-argument-v2' stroke='%23FF661A'%3e%3cg id='Group' transform='translate(3.000000, 2.500000)'%3e%3cpath d='M1,3 L13,3 L11.8900496,14.0995037 C11.8389294,14.6107055 11.4087639,15 10.8950124,15 L3.10498756,15 C2.59123611,15 2.16107055,14.6107055 2.10995037,14.0995037 L1,3 Z' id='Rectangle' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3c/path%3e%3cpath d='M7,11 L7,6' id='Line' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3c/path%3e%3cpath d='M9.5,11 L9.5,6' id='Line-Copy' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3c/path%3e%3cpath d='M4.5,11 L4.5,6' id='Line-Copy-2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3e%3c/path%3e%3crect id='Rectangle-2' fill='%23FF661A' x='0' y='2.5' width='14' height='1' rx='0.5'%3e%3c/rect%3e%3cpath d='M6,0 L8,0 C8.55228475,-1.01453063e-16 9,0.44771525 9,1 L9,3 L5,3 L5,1 C5,0.44771525 5.44771525,1.01453063e-16 6,0 Z' id='Rectangle-3' stroke-width='1.5'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",Blockly.FieldArgumentEditor.prototype.showEditor_=function(){Blockly.FieldArgumentEditor.superClass_.showEditor_.call(this);var e=Blockly.WidgetDiv.DIV;e.className+=" argumentEditorInput";var t=document.createElement("img");if(t.setAttribute("class","argumentEditorRemoveIcon"),t.setAttribute("src",Blockly.FieldArgumentEditor.REMOVE_ARG_URI),this.removeButtonMouseWrapper_=Blockly.bindEvent_(t,"mousedown",this,this.removeCallback_),e.appendChild(t),this.sourceBlock_&&this.sourceBlock_.typeName_){var o=Blockly.PXTBlockly.FunctionUtils.getArgumentIcon(this.sourceBlock_.typeName_);if(o){var l=o+" icon argumentEditorTypeIcon",i=document.createElement("i");i.className=l,e.appendChild(i)}}},Blockly.FieldArgumentEditor.prototype.removeCallback_=function(){this.sourceBlock_&&this.sourceBlock_.removeFieldCallback?this.sourceBlock_.removeFieldCallback(this):console.warn("Expected a source block with removeFieldCallback")},Blockly.FieldArgumentEditor.fromJson=function(e){var t=Blockly.utils.replaceMessageReferences(e.text),o=new Blockly.FieldArgumentEditor(t,e.class);return"boolean"==typeof e.spellcheck&&o.setSpellcheck(e.spellcheck),o},Blockly.fieldRegistry.register("field_argument_editor",Blockly.FieldArgumentEditor);