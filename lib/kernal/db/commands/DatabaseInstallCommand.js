'use strict';

const Command = use('command/Command');

/**
 * @Command(['database:install', 'dbi'])
 */
module.exports = class DatabaseInstallCommand extends Command.class {

  /**
   * @Inject('db')
   */
  inject(db) {
    this._db = db;
  }

  define() {
    this.addArgument('database', 'all');
    this.addOption('force', false);
  }

  execute() {
    const database = this.argument('database');
    const force = this.option('force');

    if (database === 'all') {
      for (const name in this._db.getDefinition()) {
        this.installDatabase(name);
      }
    } else {
      this.installDatabase(database, force);
    }
  }

  installDatabase(database, force = false) {
    const that = this;
    this.info(1, 'Install database [0]', database);
    const db = this._db.get(database);
    const definition = this._db.define(database);
    const tables = definition.table();
    const action = 'install';

    if (!definition.isAction(action)) {
      if (force) {
        this.info(2, 'Force ' + action + ' database [0] even though the action [1] is excluded by database.', database, action);
      } else {
        this.info(2, 'Database [0] has action [1] excluded -> continue.', database, action);
        return;
      }
    }

    const connection = this._db.connection(database);

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
