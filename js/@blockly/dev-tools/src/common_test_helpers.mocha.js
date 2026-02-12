/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export function TestCase(){}TestCase.prototype.title="",TestCase.prototype.skip=!1,TestCase.prototype.only=!1;export function TestSuite(){}TestSuite.prototype.title="",TestSuite.prototype.skip=!1,TestSuite.prototype.only=!1,TestSuite.prototype.testCases=[];export function runTestCases(t,e){t.forEach(t=>{let s=t.skip?test.skip:test;s=t.only?test.only:s,s(t.title,e(t))})}export function runTestSuites(t,e){t.forEach(t=>{let s=t.skip?suite.skip:suite;s=t.only?suite.only:s,s(t.title,function(){runTestCases(t.testCases,e(t))})})}export function captureWarnings(t){const e=[],s=console.warn;try{console.warn=function(t){e.push(t)},t()}finally{console.warn=s}return e}