/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import Blockly from"blockly/core";export function populateRandom(o,t){const r=[];for(const o in Blockly.Blocks)Object.prototype.hasOwnProperty.call(Blockly.Blocks,o)&&Object.prototype.hasOwnProperty.call(Blockly.Blocks[o],"init")&&r.push(o);for(let l=0;l<t;l++){const t=r[Math.floor(Math.random()*r.length)],l=o.newBlock(t);l.initSvg(),l.getSvgRoot().setAttribute("transform","translate("+Math.round(450*Math.random()+40)+", "+Math.round(600*Math.random()+40)+")"),l.render()}}