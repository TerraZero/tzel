'use strict';

const prompt = require('prompt-sync')();
const color = require('cli-color');

const Command = use('command/Command');

module.exports = class InputCommand extends Command {

  input(ask, completions = [], limit = false) {
    let cache = null;
    const options = {};

    if (completions && completions.length) {
      options.autocomplete = function (value) {
        if (cache && (cache.indexOf(value) >= 0 || value.length === 0)) return cache;
        cache = [];

        for (const index in completions) {
          if (completions[index].startsWith(value)) {
            cache.push(completions[index]);
          }
        }
        return cache;
      }
    }

    if (!limit) return prompt(ask, false, options);

    while (true) {
      const value = prompt(ask, false, options);

      if (value === null) return null;

      if (completions.indexOf(value) >= 0) {
        return value;
      }
      this.out(color.redBright('Invalid option [0]'), value);
      this.out(color.redBright('Select one of [0]'), completions);
    }
  }

  ask(ask, fallback = null) {
    if (fallback) {
      const value = prompt(ask + ' ' + color.cyan('[' + fallback + ']') + ': ');
      if (value) {
        return value;
      } else {
        return fallback;
      }
    } else {
      return prompt(ask + ': ');
    }
  }

}
