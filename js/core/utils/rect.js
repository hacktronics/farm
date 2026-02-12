/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.Rect"),Blockly.utils.Rect=function(t,i,o,s){this.top=t,this.bottom=i,this.left=o,this.right=s},Blockly.utils.Rect.prototype.contains=function(t,i){return t>=this.left&&t<=this.right&&i>=this.top&&i<=this.bottom},Blockly.utils.Rect.prototype.intersects=function(t){return!(this.left>t.right||this.right<t.left||this.top>t.bottom||this.bottom<t.top)};