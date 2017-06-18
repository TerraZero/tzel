'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:db', 'tdb'])
 *
 * @Inject('db')
 */
module.exports = class CommandDbCommand extends Command {

  inject(db) {
    this._db = db;
  }

  define() {

  }

  execute() {
    const d = this._db.define();

    log(d.user.create().toQuery().text);
  }

}
