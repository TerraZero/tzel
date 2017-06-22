'use strict';

const sql = require('sql');

module.exports = class Query {

  constructor(db) {
    this._db = db;
    this._data = {};
    this._query = null;
  }

  db() {
    return this._db;
  }

  query() {
    return this._query;
  }

  data(name, set) {
    if (set === undefined) {
      return this._data[name];
    } else {
      this._data[name] = set;
      return this;
    }
  }

  table(name) {
    if (name instanceof sql.Table) return name;
    return this.db()[name];
  }

  select(basetable) {
    const table = this.table(basetable);

    this.data('base', table);
    this._query = table.select().from(table);
    return this;
  }

}
