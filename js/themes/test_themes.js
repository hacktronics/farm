/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";function getTestTheme(e){return Blockly.Themes.testThemes_[e]}function populateTestThemes(){for(var e,t=document.getElementById("themeChanger"),s=Object.keys(Blockly.Themes.testThemes_),l=0;e=s[l];l++){var T=document.createElement("option");T.setAttribute("value",e),T.textContent=e,t.appendChild(T)}}goog.provide("Blockly.TestThemes"),Blockly.Themes.TestHats=Blockly.Theme.defineTheme("testhats",{base:Blockly.Themes.Classic}),Blockly.Themes.TestHats.setStartHats(!0),Blockly.Themes.TestFont=Blockly.Theme.defineTheme("testfont",{base:Blockly.Themes.Classic}),Blockly.Themes.TestFont.setFontStyle({family:'"Times New Roman", Times, serif',weight:null,size:16}),Blockly.Themes.testThemes_={"Test Hats":Blockly.Themes.TestHats,"Test Font":Blockly.Themes.TestFont};