'use strict';

const sql = require('sql');
const DBTable = use('db/src/DBTable');

module.exports = class DBDefinition {

  constructor(name) {
    this._name = name;
    this._tables = {};
    this._db = null;
  }

  name() {
    return this._name;
  }

  addTable(name) {
    this._tables[name] = new DBTable(name);
    return this._tables[name];
  }

  tables() {
    return this._tables;
  }

  getDB() {
    if (this._db === null) {
      this._db = {};
      const tables = this.tables();

      for (const name in tables) {
        this._db[name] = sql.define(tables[name].prop());
      }
    }
    return this._db;
  }

}
