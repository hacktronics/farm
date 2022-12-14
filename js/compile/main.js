/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

goog.provide('Main');
// Core
// Either require 'Blockly.requires', or just the components you use:
goog.require('Blockly');
goog.require('Blockly.geras.Renderer');
goog.require('Blockly.VerticalFlyout');
// pxt-blockly
goog.require('Blockly.pxt.Renderer');
goog.require('Blockly.PXTBlockly.Extensions');
// Blocks
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.Constants.Loops');
goog.require('Blockly.Constants.Math');
goog.require('Blockly.Constants.TestBlocks');
goog.require('Blockly.Constants.Text');
goog.require('Blockly.Constants.Lists');
goog.require('Blockly.Constants.Colour');
goog.require('Blockly.Constants.Variables');
goog.require('Blockly.Constants.VariablesDynamic');
goog.require('Blockly.Blocks.procedures');

Main.init = function() {
  Blockly.inject('blocklyDiv', {
    'toolbox': document.getElementById('toolbox')
  });
};
window.addEventListener('load', Main.init);
