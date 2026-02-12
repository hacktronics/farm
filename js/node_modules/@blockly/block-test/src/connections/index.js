/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";import{category as rowCategory,onInit as initRow}from"./row";import{category as stackCategory,onInit as initStack}from"./stack";import{category as statementCategory,onInit as initStatement}from"./statement";export const category={kind:"CATEGORY",name:"Connections",expanded:"true",contents:[rowCategory,stackCategory,statementCategory]};export function onInit(t){initRow(t),initStack(t),initStatement(t)}