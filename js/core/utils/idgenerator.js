/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.utils.IdGenerator"),Blockly.utils.IdGenerator.nextId_=0,Blockly.utils.IdGenerator.getNextUniqueId=function(){return"blockly-"+(Blockly.utils.IdGenerator.nextId_++).toString(36)};