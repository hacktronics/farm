/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.deprecation"),Blockly.utils.deprecation.warn=function(e,n,o,l){var t=e+" was deprecated on "+n+" and will be deleted on "+o+".";l&&(t+="\nUse "+l+" instead."),console.warn(t)};