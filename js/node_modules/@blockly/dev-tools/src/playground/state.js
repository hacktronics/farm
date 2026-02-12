/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export class LocalStorageState{constructor(t,e){this.key_=t,this.state_=Object.create(null),this.defaultState_=e||Object.create(null)}load(){this.state_=JSON.parse(localStorage.getItem(this.key_))||this.defaultState_}get(t){return this.state_[t]}set(t,e){this.state_[t]=e}save(){localStorage.setItem(this.key_,JSON.stringify(this.state_))}}