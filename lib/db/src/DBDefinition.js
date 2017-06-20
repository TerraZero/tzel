'use strict';

const sql = require('sql');
const DBTable = use('db/src/DBTable');

module.exports = class DBDefinition {

  constructor(name, driver, settings) {
    this._name = name;
    this._driver = driver;
    this._settings = settings;
    this._tables = {};
    this._db = null;
    this._connection = null;
  }

  name() {
    return this._name;
  }

  driver() {
    return this._driver;
  }

  settings() {
    return this._settings;
  }

  addTable(name) {
    this._tables[name] = new DBTable(name);
    return this._tables[name];
  }

  table(name = null) {
    if (name === null) {
      return this._tables;
    }
    return this._tables[name];
  }

  getDB() {
    if (this._db === null) {
      this._db = {};
      const tables = this.table();

      for (const name in tables) {
        this._db[name] = sql.define(tables[name].prop());
      }
    }
    return this._db;
  }

  connection() {
    if (this._connection === null) {
      this._connection = this.driver().open(this.settings());
    }
    return this._connection;
  }

  close() {
    if (this._connection !== null) {
      this.driver().close(this.settings(), this._connection);
      this._connection = null;
    }
  }

}
