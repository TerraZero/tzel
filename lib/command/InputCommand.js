'use strict';

const prompt = require('prompt-sync')();
const color = require('cli-color');

const Command = use('command/Command');

module.exports = class InputCommand extends Command {

  getAutocompleteFunction(definition, completions = [], cache = []) {
    if (!cache || cache.length == 0) cache = completions;

    return function (value) {
      if (cache && (cache.indexOf(value) >= 0 || value.length === 0)) return cache;
      cache = [];

      for (const index in completions) {
        if (completions[index].startsWith(value)) {
          cache.push(completions[index]);
        }
      }
      return cache;
    };
  }

  input(definition) {
    const options = {};

    // build question
    let fallback = definition.fallback || null;
    if (fallback) fallback = ' [' + fallback + ']';

    let ask = definition.ask || null;

    let sep = ': ';
    if (!ask) sep = '> ';

    const question = this.color('ask')(ask) + this.color('fallback')(fallback) + this.color('sep')(sep);

    // generate autocompletion
    if (definition.completions) {
      options.autocomplete = this.getAutocompleteFunction(definition, definition.completions);
    }

    while (true) {
      const value = prompt(question, false, options);

      if (value === null) return null;

      if (!definition.limit || definition.completions.indexOf(value) >= 0) {
        if (definition.fallback !== undefined && value === '') {
          return definition.fallback;
        }
        return value;
      }

      if (definition.fallback !== undefined && value === '') {
        return definition.fallback;
      }

      this.out(this.color('error')('Invalid option [0]'), value);
      this.out(this.color('error')('Select one of [0]'), definition.completions);
    }
  }

  passColor(value) {
    return value;
  }

  color(type) {
    switch (type) {
      case 'fallback':
        return color.cyan;
      case 'ask':
      case 'sep':
        return this.passColor;
      case 'error':
        return color.redBright;
      default:
        return this.passColor;
    }
  }

}
