'use strict';

const sql = require('sql');

module.exports = class Query {

  constructor(name, db) {
    this._name = name;
    this._db = db;
  }

  name() {
    return this._name;
  }

  db() {
    return this._db;
  }

}
