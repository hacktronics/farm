/**
 * @license
 * PXT Blockly
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * https://github.com/Microsoft/pxt-blockly
 *
 * See LICENSE file for details.
 */
"use strict";goog.provide("Blockly.pxtBlocklyUtils"),Blockly.pxtBlocklyUtils._duplicateOnDragWhitelist=null,Blockly.pxtBlocklyUtils.measureText=function(t,e,r,l){var o=document.createElement("canvas").getContext("2d");return o.font=r+" "+t+" "+e,o.measureText(l).width},Blockly.pxtBlocklyUtils.isShadowArgumentReporter=function(t){return t.isShadow()&&("variables_get_reporter"===t.type||"argument_reporter_boolean"===t.type||"argument_reporter_number"===t.type||"argument_reporter_string"===t.type||"argument_reporter_array"===t.type||"argument_reporter_custom"===t.type||Blockly.pxtBlocklyUtils._duplicateOnDragWhitelist&&-1!==Blockly.pxtBlocklyUtils._duplicateOnDragWhitelist.indexOf(t.type))},Blockly.pxtBlocklyUtils.isFunctionArgumentReporter=function(t){return"argument_reporter_boolean"==t.type||"argument_reporter_number"==t.type||"argument_reporter_string"==t.type||"argument_reporter_array"==t.type||"argument_reporter_custom"==t.type},Blockly.pxtBlocklyUtils.whitelistDraggableBlockTypes=function(t){Blockly.pxtBlocklyUtils._duplicateOnDragWhitelist=t.slice()},Blockly.pxtBlocklyUtils.hasMatchingArgumentReporter=function(t,e){for(var r=e.getFieldValue("VALUE"),l=e.getTypeName(),o=0;o<t.inputList.length;++o){var n=t.inputList[o];if(n.type==Blockly.INPUT_VALUE){var i=n.connection.targetBlock();if(!i||i.type!=e.type)continue;var p=i.getFieldValue("VALUE"),a=i.getTypeName();if(p==r&&l==a)return!0}}return!1};