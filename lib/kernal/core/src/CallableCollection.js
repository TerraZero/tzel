'use strict';

module.exports = class CallableCollection {

  constructor(callables = []) {
    this._callables = callables;
  }

  callables() {
    return this._callables;
  }

  add(callable) {
    this.callables().push(callable);
    return this;
  }

  get(index) {
    return this.callables()[index];
  }

  call(...args) {
    return this.apply(args);
  }

  apply(args = []) {
    const returns = [];
    const temp = this.callables();

    for (const index in temp) {
      returns.push(temp[index].apply(args));
    }
    return returns;
  }

}
