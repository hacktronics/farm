/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.math"),Blockly.utils.math.toRadians=function(t){return t*Math.PI/180},Blockly.utils.math.toDegrees=function(t){return 180*t/Math.PI},Blockly.utils.math.clamp=function(t,a,l){if(l<t){var i=l;l=t,t=i}return Math.max(t,Math.min(a,l))};