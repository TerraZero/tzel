'use strict';

const Command = use('command/Command');

/**
 * @Command(['database:install', 'dbi'])
 *
 * @Inject('manager.db')
 */
module.exports = class DatabaseInstallCommand extends Command {

  inject(db) {
    this._db = db;
  }

  define() {
    this.addArgument('database', 'all');
  }

  execute() {
    const database = this.argument('database');

    if (database === 'all') {
      for (const name in this._db.getDefinition()) {
        this.installDatabase(name);
      }
    } else {
      this.installDatabase(database);
    }
  }

  installDatabase(database) {
    const that = this;
    this.info(1, 'Install database [0]', database);
    const connection = this._db.connection(database);
    const db = this._db.get(database);
    const definition = this._db.define(database);
    const tables = definition.table();

    for (const table in tables) {
      this.info(2, 'Create table [0]', table);
      const create = db[table].create().toQuery().text;
      this.info(3, create);
      (function (name) {
        connection.query(create, function (error, results, fields) {
          if (error) throw error;
          that.info(2, 'Finished create table [0] in [1]', name, database);
        });
      })(table);
    }
  }

}
