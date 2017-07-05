'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:entity:test', 'et'])
 */
module.exports = class CommandEntityTestCommand extends Command.class {

  /**
   * @Inject('manager.entity')
   * @Inject('manager.db')
   */
  inject(manager, db) {
    this._manager = manager;
    this._db = db;
  }

  define() {

  }

  execute() {
    const n = this._manager.load('node', 5);
    log(n);
  }

}
