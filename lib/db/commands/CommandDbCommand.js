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
    const db = this._db.get();

    const arg = db.user.create().toQuery();
    log(arg.text);
  }

}
