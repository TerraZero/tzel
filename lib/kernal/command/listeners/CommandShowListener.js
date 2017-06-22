'use strict';

const color = require('cli-color');

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
      const verbose = command.option('verbose');
      const register = this._boot.provider('command').register();
      const groups = {};

      for (const index in register) {
        const data = register[index];

        if (groups[data.get('annotation').group] === undefined) {
          groups[data.get('annotation').group] = [];
        }
        groups[data.get('annotation').group].push(data);
      }

      event.out();
      for (const group in groups) {
        if (group === Command.noGroup) {
          event.out('group', 'No Group');
        } else {
          event.out('group', group);
        }
        for (const index in groups[group]) {
          event.out('item', ' - ' + this.getItemLine(command, groups[group][index], verbose));
        }
        event.out();
      }
    }
  }

  getItemLine(command, item, verbose) {
    const parts = [];

    if (verbose) {
      parts.push(this.getItemLine(command, item, false));
      const com = use('command::' + item.get('names')[0]);
      const args = com.infos('arguments');
      const options = com.infos('options');

      const cArgs = command.color('args');
      const cOptions = command.color('options');

      for (const index in args) {
        let name = index;

        if (args[index].multi) {
          name = '...' + name;
        }
        if (args[index].fallback === undefined) {
          parts.push(cArgs('<' + name + '>'));
        } else {
          parts.push(cArgs('(' + name + ':' + args[index].fallback + ')'));
        }
      }

      for (const index in options) {
        if (options[index].fallback === undefined) {
          parts.push(cOptions('{' + index + '}'));
        } else {
          parts.push(cOptions('{' + index + ':' + options[index].fallback + '}'));
        }
      }
    } else {
      const names = item.get('names').slice();

      parts.push(names.shift());

      if (names.length) {
        parts.push('[' + names.join(', ') + ']');
      }
    }
    return parts.join(' ');
  }

}
