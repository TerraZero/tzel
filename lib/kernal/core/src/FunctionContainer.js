'use strict';

module.exports = class FunctionContainer {

  constructor() {
    this._functions = [];
  }

  add(func, context = null, meta = null) {
    this._functions.push({
      context: context,
      func: func,
      meta: meta,
    });
    return this;
  }

  call(...args) {
    return this.apply(args);
  }

  apply(args = []) {
    const returns = [];

    for (const index in this._functions) {
      const r = this._functions[index].func.apply(this._functions[index].context, args);

      if (r !== undefined) {
        returns.push(r);
      }
    }
    return returns;
  }

  functions() {
    return this._functions;
  }

}
