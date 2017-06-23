'use strict';

const Pattern = require('url-pattern');
const Query = use('db/src/Query');

module.exports = class QueryBuilder {

  constructor(name, callable, context = null) {
    this._name = name;
    this._callable = callable;
    this._context = null;
    this._db = null;

    this._compiles = {};

    if (context) {
      this._context = new Pattern(context);
    }
  }

  name() {
    return this._name;
  }

  setDB(db) {
    this._db = db;
    return this;
  }

  getContext(args = {}) {
    if (this._context) {
      return this._context.stringify(args);
    }
    return null;
  }

  getCompile(context) {
    return this._compiles[context];
  }

  setCompile(context, query) {
    this._compiles[context] = query;
    return this;
  }

  compile(args = {}) {
    const context = this.getContext(args);
    let compile = this.getCompile(context);

    if (compile === undefined) {
      compile = new Query(this.name(), context);
      this._callable.call(compile, args, this._db);
      this.setCompile(context, compile);
    }
    return compile;
  }

}
