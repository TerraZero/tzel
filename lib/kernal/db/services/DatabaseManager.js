'use strict';

const sql = require('sql');
const DBDefinition = use('db/src/DBDefinition');

sql.setDialect('mysql');

/**
 * @Service('manager.db')
 */
module.exports = class DatabaseManager {

  constructor() {
    this._define = null;
  }

  /**
   * @Inject('helper.boot')
   * @Inject('helper.settings')
   * @Inject('handler.event')
   */
  inject(boot, settings, event) {
    this._boot = boot;
    this._settings = settings;
    this._event = event;
  }

  getDriver(type) {
    return use('dbdriver::' + type);
  }

  getDefinition() {
    if (this._define === null) {
      const databases = this._settings.get('databases');
      this._define = {};

      for (const name in databases) {
        const db = new DBDefinition(name, this.getDriver(databases[name].driver), databases[name]);
        const definition = use('dbtable::' + name);

        if (definition === null) {
          this._event.trigger('system.alter', 'database', db, { name: name });
          this._define[name] = db;
          continue;
        }

        for (const i in definition.collection) {
          const item = definition.collection[i];
          const tablename = (item.annotation.table === '::function' ? item.target : item.annotation.table);
          const table = db.addTable(tablename);
          const subject = definition.subjects[item.file];

          subject[item.target].call(subject, table, db);
        }

        this._event.trigger('system.alter', 'database', db, { name: name });
        this._define[name] = db;
      }
    }
    return this._define;
  }

  getBuilder(name, db = 'default') {
    return use('querybuilder::' + name).setDB(this.get(db));
  }

  getQuery(name, args = {}, db = 'default') {
    return this.getBuilder(name, db).compile(args);
  }

  query(name, args = {}, db = 'default') {
    return this.getQuery(name, args, db).build(args);
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
