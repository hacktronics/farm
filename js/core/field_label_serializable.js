/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";goog.provide("Blockly.FieldLabelSerializable"),goog.require("Blockly.FieldLabel"),goog.require("Blockly.fieldRegistry"),goog.require("Blockly.utils"),goog.require("Blockly.utils.object"),Blockly.FieldLabelSerializable=function(l,e,i){Blockly.FieldLabelSerializable.superClass_.constructor.call(this,l,e,i)},Blockly.utils.object.inherits(Blockly.FieldLabelSerializable,Blockly.FieldLabel),Blockly.FieldLabelSerializable.fromJson=function(l){var e=Blockly.utils.replaceMessageReferences(l.text);return new Blockly.FieldLabelSerializable(e,void 0,l)},Blockly.FieldLabelSerializable.prototype.EDITABLE=!1,Blockly.FieldLabelSerializable.prototype.SERIALIZABLE=!0,Blockly.fieldRegistry.register("field_label_serializable",Blockly.FieldLabelSerializable);