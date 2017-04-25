'use strict';

module.exports = class Event {

  constructor(name) {
    this._name = name;
  }

  name() {
    return this._name;
  }

  setArgs(...args) {
    this._args = args;
    return this;
  }

}
