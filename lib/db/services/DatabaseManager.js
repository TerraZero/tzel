'use strict';

const sql = require('sql');
const DBDefinition = use('db/src/DBDefinition');

sql.setDialect('mysql');

/**
 * @Service('manager.db')
 *
 * @Inject('helper.boot')
 * @Inject('helper.settings')
 */
module.exports = class DatabaseManager {

  constructor() {
    this._define = null;
  }

  inject(boot, settings) {
    this._boot = boot;
    this._settings = settings;
  }

  getDriver(type) {
    return use('dbdriver::' + type);
  }

  getDefinition() {
    if (this._define === null) {
      const databases = this._settings.get('databases');
      const provider = this._boot.provider('dbtable');
      const data = provider.getData();
      this._define = {};

      for (const name in databases) {
        const db = new DBDefinition(name, this.getDriver(databases[name].driver), databases[name]);

        for (const index in data) {
          provider.provide(index).define(db);
        }
        this._define[name] = db;
      }
    }
    return this._define;
  }

  get(name = 'default') {
    return this.define(name).getDB();
  }

  define(name = 'default') {
    return this.getDefinition()[name];
  }

  connection(db = 'default') {
    return this.define(db).connection();
  }

  closeAll() {
    const define = this.getDefinition();

    for (const name in define) {
      this.define(name).close();
    }
  }

}
