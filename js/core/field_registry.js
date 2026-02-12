/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.fieldRegistry"),goog.require("Blockly.registry"),goog.requireType("Blockly.Field"),goog.requireType("Blockly.IRegistrableField"),Blockly.fieldRegistry.register=function(e,r){Blockly.registry.register(Blockly.registry.Type.FIELD,e,r)},Blockly.fieldRegistry.unregister=function(e){Blockly.registry.unregister(Blockly.registry.Type.FIELD,e)},Blockly.fieldRegistry.fromJson=function(e){var r=Blockly.registry.getObject(Blockly.registry.Type.FIELD,e.type);return r?r.fromJson(e):(console.warn("Blockly could not create a field of type "+e.type+". The field is probably not being registered. This could be because the file is not loaded, the field does not register itself (Issue #1584), or the registration is not being reached."),null)};