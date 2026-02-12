/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.blockRendering"),goog.require("Blockly.registry"),goog.requireType("Blockly.blockRendering.Renderer"),goog.requireType("Blockly.Theme"),Blockly.blockRendering.useDebugger=!1,Blockly.blockRendering.register=function(e,r){Blockly.registry.register(Blockly.registry.Type.RENDERER,e,r)},Blockly.blockRendering.unregister=function(e){Blockly.registry.unregister(Blockly.registry.Type.RENDERER,e)},Blockly.blockRendering.startDebugger=function(){Blockly.blockRendering.useDebugger=!0},Blockly.blockRendering.stopDebugger=function(){Blockly.blockRendering.useDebugger=!1},Blockly.blockRendering.init=function(e,r,l){var o=new(Blockly.registry.getClass(Blockly.registry.Type.RENDERER,e))(e);return o.init(r,l),o};