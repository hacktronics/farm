/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.svgPaths"),Blockly.utils.svgPaths.point=function(t,l){return" "+t+","+l+" "},Blockly.utils.svgPaths.curve=function(t,l){return" "+t+l.join("")},Blockly.utils.svgPaths.moveTo=function(t,l){return" M "+t+","+l+" "},Blockly.utils.svgPaths.moveBy=function(t,l){return" m "+t+","+l+" "},Blockly.utils.svgPaths.lineTo=function(t,l){return" l "+t+","+l+" "},Blockly.utils.svgPaths.line=function(t){return" l"+t.join("")},Blockly.utils.svgPaths.lineOnAxis=function(t,l){return" "+t+" "+l+" "},Blockly.utils.svgPaths.arc=function(t,l,n,s){return t+" "+n+" "+n+" "+l+s};