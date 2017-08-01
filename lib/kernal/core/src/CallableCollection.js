'use strict';

module.exports = class CallableCollection {

  constructor(callables = []) {
    this._callables = callables;
    this._filters = [];
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
      if (this.checkFilters(temp[index], args)) continue;
      returns.push(temp[index].apply(args));
    }
    return returns;
  }

  execute(func, args = null) {
    const returns = [];
    const temp = this.callables();

    for (const index in temp) {
      if (this.checkFilters(temp[index], args)) continue;
      const response = func(temp[index], index, args);

      if (response !== undefined) returns.push(response);
    }
    return returns;
  }

  checkFilters(callable, args) {
    if (!this._filters.length) return false;

    for (const index in this._filters) {
      if (this._filters[index].call(callable, args)) return true;
    }
    return false;
  }

  filter(callable) {
    this._filters.push(callable);
    return this;
  }

  resetFilter() {
    this._filters = [];
    return this;
  }

  length() {
    return this.callables().length;
  }

  *[Symbol.iterator]() {
    let delta = 0;
    const callables = this.callables();

    while (delta < callables.length) {
      yield callables[delta++];
    }
  }

}
