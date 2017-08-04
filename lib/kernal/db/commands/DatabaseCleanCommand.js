'use strict';

const Command = use('command/Command');

/**
 * @Command(['database:clean', 'dbclean'])
 */
module.exports = class DatabaseCleanCommand extends Command.class {

  /**
   * @Inject('db')
   */
  inject(db) {
    this._db = db;
  }

  define() {
    this.addArgument('database');
    this.addOption('force', false);
  }

  execute() {
    const database = this.argument('database');
    const force = this.option('force');

    if (database === 'all') {
      for (const name in this._db.getDefinition()) {
        this.cleanDatabase(name);
      }
    } else {
      this.cleanDatabase(database, force);
    }
  }

  cleanDatabase(database, force = false) {
    const that = this;
    this.info(1, 'Clean database [0]', database);
    const definition = this._db.define(database);
    const tables = definition.table();
    const dropTables = [];
    const action = 'clean';

    if (!definition.isAction(action)) {
      if (force) {
        this.info(2, 'Force ' + action + ' database [0] even though the action [1] is excluded by database.', database, action);
      } else {
        this.info(2, 'Database [0] has action [1] excluded -> continue.', database, action);
        return;
      }
    }

    const connection = this._db.connection(database);

    for (const name in tables) {
      dropTables.push(name);
    }
    connection.query('DROP TABLE IF EXISTS ' + dropTables.reverse().join(', '), function (error, results, fields) {
      if (error) throw error;
      that.info(2, 'Finished clean database [0]', database);
    });
  }

}
