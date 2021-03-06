'use strict';

/**
 * @Base('event')
 */
module.exports = class Event {

  constructor(name) {
    this._name = name;
    this._returns = null;
  }

  /**
   * @return {string} the name of the event
   */
  name() {
    return this._name;
  }

  /**
   * Set the values for this event.
   *
   * @param {any} args
   */
  setArgs(...args) {
    this._args = args;
    return this;
  }

  /**
   * Set the return values of the listeners
   *
   * @param {any[]} returns
   */
  setReturns(returns) {
    this._returns = returns;
    return this;
  }

  /**
   * Getter for the listener returns.
   *
   * @return {any[]}
   */
  getReturns() {
    return this._returns;
  }

  /**
   * Execute before listener is invoked
   *
   * @param {Object} listener the listener to invoke
   * @param {string} func the function name of the listener to invoke
   */
  startListener(listener, func) { }

  /**
   * Execute after listener is invoked
   *
   * @param {Object} listener the invoked listener
   * @param {string} func the name of the listener function
   */
  endListener(listener, func) { }

}
