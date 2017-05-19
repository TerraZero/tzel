'use strict';

const Command = use('command/Command');
const Base = use('core/annotations/Base');

/**
 * @Command(['test'])
 *
 * @Inject('helper.options')
 */
module.exports = class TestCommand extends Command {

  inject(mods) {
    this._mods = mods;
  }

  define() {

  }

  execute() {
    use('event::command.system.init');
    //log(use('base::command.generate'));
  }

}
