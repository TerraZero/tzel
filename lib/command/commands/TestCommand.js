'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['test', 't'])
 *
 * @Inject('helper.boot')
 * @Inject('helper.options')
 */
module.exports = class TestCommand extends Command {

  inject(boot, options) {
    this._boot = boot;
    this._options = options;
  }

  define() {

  }

  execute() {
    log(use('event::command.event'));
  }

}
