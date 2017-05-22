'use strict';

/**
 * @Base('event')
 */
module.exports = class Event {

  constructor(name) {
    this._name = name;
    this._returns = null;
  }

  name() {
    return this._name;
  }

  setArgs(...args) {
    this._args = args;
    return this;
  }

  setReturns(returns) {
    this._returns = returns;
    return this;
  }

  getReturns() {
    return this._returns;
  }

  startListener(listener, func) { }

  endListener(listener, func) { }

}
