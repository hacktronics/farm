/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";goog.provide("Blockly.pxt.Drawer"),goog.require("Blockly.blockRendering.Types"),goog.require("Blockly.pxt.ConstantProvider"),goog.require("Blockly.zelos.Drawer"),goog.require("Blockly.utils.object"),Blockly.pxt.Drawer=function(t,s){Blockly.pxt.Drawer.superClass_.constructor.call(this,t,s)},Blockly.utils.object.inherits(Blockly.pxt.Drawer,Blockly.zelos.Drawer),Blockly.pxt.Drawer.prototype.drawCollapsedStack_=function(t){var s=this.constants_.STATEMENT_INPUT_NOTCH_OFFSET+this.constants_.INSIDE_CORNERS.width,o=this.constants_.STATEMENT_INPUT_PADDING_LEFT+2*this.constants_.INSIDE_CORNERS.width+Blockly.utils.svgPaths.lineOnAxis("h",-this.constants_.INSIDE_CORNERS.width)+this.constants_.INSIDE_CORNERS.pathTop,i=t.height-2*this.constants_.INSIDE_CORNERS.height,n=this.constants_.INSIDE_CORNERS.pathBottom+Blockly.utils.svgPaths.lineOnAxis("h",this.constants_.INSIDE_CORNERS.width),l=this.constants_.ELLIPSES;this.outlinePath_+=this.constants_.OUTSIDE_CORNERS.bottomRight+Blockly.utils.svgPaths.lineOnAxis("H",s)+o+Blockly.utils.svgPaths.lineOnAxis("v",i/2)+l+Blockly.utils.svgPaths.lineOnAxis("v",i/2)+n+Blockly.utils.svgPaths.lineOnAxis("H",t.xPos+t.width-this.constants_.OUTSIDE_CORNERS.rightHeight)+this.constants_.OUTSIDE_CORNERS.topRight},Blockly.pxt.Drawer.prototype.drawLeft_=function(){if(Blockly.pxt.Drawer.superClass_.drawLeft_.call(this),this.info_.rows.find(function(t){return t.isCollapsedStack})){var t=this.info_.startY;Blockly.blockRendering.Types.isLeftRoundedCorner(this.info_.topRow.elements[0])&&(t+=this.constants_.OUTSIDE_CORNERS.rightHeight),this.outlinePath_=this.outlinePath_.slice(0,-1),this.outlinePath_+=Blockly.utils.svgPaths.lineOnAxis("V",t)}},Blockly.pxt.Drawer.prototype.drawLeftDynamicConnection_=function(){Blockly.pxt.Drawer.superClass_.drawLeftDynamicConnection_.call(this),this.block_.pathObject.positionConnectionIndicator(this.block_.outputConnection.getOffsetInBlock().x,this.block_.outputConnection.getOffsetInBlock().y)};