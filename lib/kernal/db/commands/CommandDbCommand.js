'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:db', 'tdb'])
 *
 * @Inject('manager.db')
 */
module.exports = class CommandDbCommand extends Command {

  inject(db) {
    this._db = db;
  }

  define() {

  }

  execute() {
    this._db.query('entity.load', { entity: 'node', id: 4 });
    this._db.query('entity.load', { entity: 'node', id: 4 });
    this._db.query('entity.load', { entity: 'node', id: 5 });
  }

}
