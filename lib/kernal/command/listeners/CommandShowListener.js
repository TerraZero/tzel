'use strict';

const color = require('cli-color');

const Command = use('command/annotations/Command');

module.exports = class CommandShowListener {

  /**
   * @Inject('helper.boot')
   */
  inject(boot) {
    this._boot = boot;
  }

  /**
   * @Listener('command.show')
   *
   * @param {Event} event
   */
  show(event) {
    if (event.type() === 'commands') {
      const command = event.command();
      const verbose = command.option('verbose');
      const data = this._boot.getClassesFromProvider('command');
      const groups = {};

      for (const index in data) {
        if (groups[data[index].group] === undefined) {
          groups[data[index].group] = [];
        }
        groups[data[index].group].push(data[index]);
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

  getItemLine(command, data, verbose) {
    const parts = [];

    if (verbose) {
      parts.push(this.getItemLine(command, data, false));
      const com = use('command::' + data.key);
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
      parts.push(data.key);

      if (data.alias) {
        parts.push('[' + data.alias.join(', ') + ']');
      }
    }
    return parts.join(' ');
  }

}
