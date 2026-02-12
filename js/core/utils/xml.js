/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.xml"),Blockly.utils.xml.NAME_SPACE="https://developers.google.com/blockly/xml",Blockly.utils.xml.document=function(){return document},Blockly.utils.xml.createElement=function(l){return Blockly.utils.xml.document().createElementNS(Blockly.utils.xml.NAME_SPACE,l)},Blockly.utils.xml.createTextNode=function(l){return Blockly.utils.xml.document().createTextNode(l)},Blockly.utils.xml.textToDomDocument=function(l){return(new DOMParser).parseFromString(l,"text/xml")},Blockly.utils.xml.domToText=function(l){return(new XMLSerializer).serializeToString(l)};