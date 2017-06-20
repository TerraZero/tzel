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
    const node = db.node;


    /*
    log(node.create().toQuery().text);
    const query = user.select(user.id, user.name.as('cool'))
      .from(user)
      .where(user.name.equals('hallo').and(user.id.equals(5))).or(user.id.isNotNull())
      .toQuery();
    log(query.text);
    //*/

    const connection = this._db.connection();

    connection.query(node.create().toQuery().text, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      connection.end();
    });
  }

}
