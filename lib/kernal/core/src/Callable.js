'use strict';

module.exports = class Callable {

  static create(callable, func = null) {
    if (callable instanceof Callable) return callable;
    if (typeof callable === 'function') return new Callable(null, callable);
    if (typeof func === 'string') return new Callable(callable, callable[func]);
    return new Callable(callable, func);
  }

  static fromContext(context, target) {
    return new Callable(context, context[target]);
  }

  constructor(context, func) {
    this._context = context;
    this._func = func;
  }

  func() {
    return this._func;
  }

  context() {
    return this._context;
  }

  call(...args) {
    return this.func().apply(this.context(), args);
  }

  apply(args = []) {
    return this.func().apply(this.context(), args);
  }

}
