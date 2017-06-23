'use strict';

module.exports = class QueryBuilder {

  constructor(name, context, func) {
    this._name = name;
    this._context = context;
    this._func = func;
  }

}
