'use strict';

const Command = use('command/Command');

/**
 * @Command(['test', 't'])
 *
 * @Inject('helper.options')
 */
module.exports = class TestCommand extends Command {

  inject(options) {
    this._options = options;
  }

  define() {

  }

  execute() {
    this._options.listBases('event');
  }

}
