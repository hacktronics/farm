/**
 * @license
 * PXT Blockly
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * https://github.com/Microsoft/pxt-blockly
 *
 * See LICENSE file for details.
 */
"use strict";goog.provide("Blockly.PXTUtils"),goog.require("goog.ui.Menu"),goog.require("goog.ui.MenuItem"),goog.require("goog.positioning.ClientPosition"),goog.require("goog.ui.Tooltip"),goog.require("goog.ui.CustomButton"),Blockly.PXTUtils.fadeColour=function(o,g,i){(o=o.replace(/[^0-9a-f]/gi,"")).length<6&&(o=o[0]+o[0]+o[1]+o[1]+o[2]+o[2]);for(var r="#",t=0;t<3;t++){var e=parseInt(o.substr(2*t,2),16),u=(e=Math.round(Math.min(Math.max(0,i?e+e*g:e-e*g),255))).toString(16);r+=("00"+u).substr(u.length)}return r};