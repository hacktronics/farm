/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.blockRendering.Measurable"),goog.require("Blockly.blockRendering.Types"),goog.requireType("Blockly.blockRendering.ConstantProvider"),Blockly.blockRendering.Measurable=function(e){this.width=0,this.height=0,this.type=Blockly.blockRendering.Types.NONE,this.xPos=0,this.centerline=0,this.constants_=e,this.notchOffset=this.constants_.NOTCH_OFFSET_LEFT};