'use strict';

const sql = require('sql');

sql.setDialect('mysql');

/**
 * @Service('db')
 *
 * @Inject('helper.boot')
 */
module.exports = class DB {

  constructor() {
    this._define = null;
  }

  inject(boot) {
    this._boot = boot;
  }

  define() {
    if (this._define === null) {
      const provider = this._boot.provider('dbtable');
      const data = provider.getData();
      const map = [];

      for (const index in data) {
        const structure = provider.provide(index);

        structure.define(map);
      }

      this._define = {};
      for (const index in map) {
        this._define[map[index].getName()] = map[index];
      }
    }
    return this._define;
  }

}
