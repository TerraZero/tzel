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
    log(this._manager.load('node', 5)[0]);
    log(this._manager.load('node', [5, 8])[0]);
    log(this._manager.load('user', 5)[0]);
  }

}
