'use strict';

module.exports = class Callable {

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
