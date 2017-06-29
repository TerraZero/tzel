'use strict';

module.exports = class Callable {

  static create(callable, func = null, data = null) {
    if (callable instanceof Callable) return callable;
    if (typeof callable === 'function') return new Callable(null, callable, func);
    if (typeof func === 'string') return new Callable(callable, callable[func], data);
    return new Callable(callable, func, data);
  }

  static fromContext(context, target, data = null) {
    return new Callable(context, context[target], data);
  }

  constructor(context, func, data = null) {
    this._context = context;
    this._func = func;
    this._data = data;
  }

  func() {
    return this._func;
  }

  context() {
    return this._context;
  }

  data() {
    return this._data;
  }

  call(...args) {
    return this.func().apply(this.context(), args);
  }

  apply(args = []) {
    return this.func().apply(this.context(), args);
  }

}
