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
   * @Listener(
   *   pattern='command.show.data.:provider'
   * )
   */
  show(event, match) {
    const data = this._boot.getClassesFromProvider(match.provider);
    const sorted = {};

    for (const index in data) {
      if (sorted[data[index].mod] === undefined) {
        sorted[data[index].mod] = [];
      }
      sorted[data[index].mod].push(data[index]);
    }

    for (const mod in sorted) {
      event.out();
      event.out('group', mod);
      for (const index in sorted[mod]) {
        event.out('item', ' - ' + sorted[mod][index].keys.join(', '));
      }
    }
  }

  /**
   * @Listener('command.show.commands')
   *
   * @param {Event} event
   */
  commands(event) {
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

    for (const group in groups) {
      event.out();
      if (group === Command.noGroup) {
        event.out('group', 'No Group');
      } else {
        event.out('group', group);
      }
      for (const index in groups[group]) {
        event.out('item', ' - ' + this.getItemLine(command, groups[group][index], verbose));
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
