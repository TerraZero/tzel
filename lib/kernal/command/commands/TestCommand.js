'use strict';

const Command = use('command/Command');

/**
 * @Command(['test', 't'])
 */
module.exports = class TestCommand extends Command.class {

  define() {

  }

  execute() {
    log('hier');
  }

}
