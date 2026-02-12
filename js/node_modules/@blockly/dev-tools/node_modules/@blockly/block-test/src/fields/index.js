/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";import{category as fieldDefaults,onInit as initDefaults}from"./defaults";import{category as fieldNumbers,onInit as initNumbers}from"./numbers";import{category as fieldAngles,onInit as initAngles}from"./angles";import{category as fieldDropdowns,onInit as initDropdowns}from"./dropdowns";import{category as fieldImages,onInit as initImages}from"./images";import{category as fieldEmoji,onInit as initEmoji}from"./emojis";import{category as fieldValidators,onInit as initValidators}from"./validators";export const category={kind:"CATEGORY",name:"Fields",expanded:"true",contents:[fieldDefaults,fieldNumbers,fieldAngles,fieldDropdowns,fieldImages,fieldEmoji,fieldValidators]};export function onInit(i){initDefaults(i),initNumbers(i),initAngles(i),initDropdowns(i),initImages(i),initEmoji(i),initValidators(i)}