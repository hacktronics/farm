/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.object"),Blockly.utils.object.inherits=function(t,e){t.superClass_=e.prototype,t.prototype=Object.create(e.prototype),t.prototype.constructor=t},Blockly.utils.object.mixin=function(t,e){for(var o in e)t[o]=e[o]},Blockly.utils.object.deepMerge=function(t,e){for(var o in e)null!=e[o]&&"object"==typeof e[o]?t[o]=Blockly.utils.object.deepMerge(t[o]||Object.create(null),e[o]):t[o]=e[o];return t},Blockly.utils.object.values=function(t){return Object.values?Object.values(t):Object.keys(t).map(function(e){return t[e]})};