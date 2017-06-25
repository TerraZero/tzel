'use strict';

module.exports = class TestClass {

  static cool() {
    log('cool');
  }

  constructor() {
    this._a = 5;
  }

  a() {
    log('a');
  }

  b() {
    log('b');
  }

}
