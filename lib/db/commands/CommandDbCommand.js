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
    const user = db.user;


    log(user.create().toQuery().text);
    const query = user.select(user.id, user.name.as('cool'))
      .from(user)
      .where(user.name.equals('hallo').and(user.id.equals(5))).or(user.id.isNotNull())
      .toQuery();
    log(query.text);
  }

}
