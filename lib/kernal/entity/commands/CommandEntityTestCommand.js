'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:entity:test', 'et'])
 *
 * @Inject('manager.entity')
 * @Inject('manager.db')
 */
module.exports = class CommandEntityTestCommand extends Command {

  inject(manager, db) {
    this._manager = manager;
    this._db = db;
  }

  define() {

  }

  execute() {

  }

}
