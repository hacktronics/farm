/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.geras.ConstantProvider"),goog.require("Blockly.blockRendering.ConstantProvider"),goog.require("Blockly.utils.object"),Blockly.geras.ConstantProvider=function(){Blockly.geras.ConstantProvider.superClass_.constructor.call(this),this.FIELD_TEXT_BASELINE_CENTER=!1,this.DARK_PATH_OFFSET=1,this.MAX_BOTTOM_WIDTH=30,this.STATEMENT_BOTTOM_SPACER=-this.NOTCH_HEIGHT/2},Blockly.utils.object.inherits(Blockly.geras.ConstantProvider,Blockly.blockRendering.ConstantProvider),Blockly.geras.ConstantProvider.prototype.getCSS_=function(o){return Blockly.geras.ConstantProvider.superClass_.getCSS_.call(this,o).concat([o+" .blocklyInsertionMarker>.blocklyPathLight,",o+" .blocklyInsertionMarker>.blocklyPathDark {","fill-opacity: "+this.INSERTION_MARKER_OPACITY+";","stroke: none;","}"])};