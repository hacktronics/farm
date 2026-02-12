/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export function enableLogger(e){e.addChangeListener(log)}export function disableLogger(e){e.removeChangeListener(log)}function log(e){console.log(e)}