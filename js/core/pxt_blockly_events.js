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
"use strict";goog.provide("Blockly.Events.EndBlockDrag"),goog.require("Blockly.Events"),goog.require("Blockly.Events.BlockBase"),goog.require("Blockly.utils.object"),Blockly.Events.EndBlockDrag=function(l){l&&(Blockly.Events.EndBlockDrag.superClass_.constructor.call(this,l),this.recordUndo=!1,this.blockId=l.id,this.allNestedIds=l.getDescendants().map(function(l){return l.id}))},Blockly.utils.object.inherits(Blockly.Events.EndBlockDrag,Blockly.Events.BlockBase),Blockly.Events.EndBlockDrag.prototype.type=Blockly.Events.END_DRAG,Blockly.Events.EndBlockDrag.prototype.toJson=function(){var l=Blockly.Events.EndBlockDrag.superClass_.toJson.call(this);return this.blockId&&(l.blockId=this.blockId),this.allNestedIds&&(l.allNestedIds=this.allNestedIds),l},Blockly.Events.EndBlockDrag.prototype.fromJson=function(l){Blockly.Events.EndBlockDrag.superClass_.fromJson.call(this,l),this.blockId=l.blockId,this.allNestedIds=l.allNestedIds},Blockly.registry.register(Blockly.registry.Type.EVENT,Blockly.Events.END_DRAG,Blockly.Events.EndBlockDrag);