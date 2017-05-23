'use strict';

const Command = use('command/annotations/Command');

/**
 * @Inject('helper.boot')
 */
module.exports = class CommandShowListener {

  inject(boot) {
    this._boot = boot;
  }

  /**
   * @Listener('command.show')
   *
   * @param {Event} event
   */
  init(event) {
    if (event.type() === 'commands') {
      const command = event.command();
      const register = this._boot.provider('command').register();
      const output = {};

      for (const index in register) {
        const data = register[index];

        if (output[data.get('annotation').group] === undefined) {
          output[data.get('annotation').group] = [];
        }
        output[data.get('annotation').group].push(data.get('names'));
      }

      command.out();
      for (const group in output) {
        if (group === Command.noGroup) {
          command.out('No Group');
        } else {
          command.out(group);
        }
        for (const index in output[group]) {
          command.out(' - ' + output[group][index].shift() + ' [' + output[group][index].join(', ') + ']');
        }
        command.out();
      }
    }
  }

}
