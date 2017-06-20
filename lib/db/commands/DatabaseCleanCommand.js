'use strict';

const Command = use('command/Command');

/**
 * @Command(['database:clean'])
 *
 * @Inject('manager.db')
 */
module.exports = class DatabaseCleanCommand extends Command {

  inject(db) {
    this._db = db;
  }

  define() {
    this.addArgument('database');
  }

  execute() {
    const database = this.argument('database');

    if (database === 'all') {
      for (const name in this._db.getDefinition()) {
        this.cleanDatabase(name);
      }
    } else {
      this.cleanDatabase(database);
    }
  }

  cleanDatabase(database) {
    const that = this;
    this.info(1, 'Clean database [0]', database);
    const connection = this._db.connection(database);
    const definition = this._db.define(database);
    const tables = definition.table();
    const dropTables = [];

    for (const name in tables) {
      dropTables.push(name);
    }
    connection.query('DROP TABLE IF EXISTS ' + dropTables.reverse().join(', '), function (error, results, fields) {
      if (error) throw error;
      that.info(2, 'Finished clean database [0]', database);
    });
  }

}
