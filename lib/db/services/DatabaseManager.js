'use strict';

const sql = require('sql');
const DBDefinition = use('db/src/DBDefinition');

sql.setDialect('mysql');

/**
 * @Service('manager.db')
 *
 * @Inject('helper.boot')
 */
module.exports = class DatabaseManager {

  constructor() {
    this._define = null;
  }

  inject(boot) {
    this._boot = boot;
  }

  getDefinition() {
    if (this._define === null) {
      const provider = this._boot.provider('dbtable');
      const data = provider.getData();
      const db = new DBDefinition('default');

      for (const index in data) {
        provider.provide(index).define(db);
      }

      this._define = {
        default: db,
      };
    }
    return this._define;
  }

  get(name = 'default') {
    return this.define(name).getDB();
  }

  define(name = 'default') {
    return this.getDefinition()[name];
  }

}
