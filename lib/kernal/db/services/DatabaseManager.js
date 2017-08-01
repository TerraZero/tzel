'use strict';

const sql = require('sql');
const DBDefinition = use('db/src/DBDefinition');

sql.setDialect('mysql');

/**
 * @Service('db')
 */
module.exports = class DatabaseManager {

  constructor() {
    this._define = null;
  }

  /**
   * @Inject('boot')
   * @Inject('settings')
   * @Inject('handler.event')
   * @Inject('dbtable')
   */
  inject(boot, settings, event, dbtable) {
    this._boot = boot;
    this._settings = settings;
    this._event = event;
    this._dbtable = dbtable;
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
        const callables = this._dbtable.getCallable(name);

        if (!callables.length()) {
          this._event.trigger('system.alter', 'database', db, { name: name });
          this._define[name] = db;
          continue;
        }

        callables.execute(function (callable, index, args) {
          const tablename = (callable.data().table === '::function' ? callable.data().target : callable.data().target);
          const table = db.addTable(tablename);

          callable.call(table, db);
        });

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
