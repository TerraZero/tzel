'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:entity:test', 'et'])
 *
 * @Inject('manager.entity')
 */
module.exports = class CommandEntityTestCommand extends Command {

  inject(manager) {
    this._manager = manager;
  }

  define() {

  }

  execute() {
    const test = this._manager.load('node', 1);
  }

}
