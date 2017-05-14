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

    let sep = definition.sep;
    if (!ask) sep = '> ';

    const question = this.color('ask')(ask) + this.color('fallback')(fallback) + this.color('sep')(sep);

    // generate autocompletion
    if (definition.completions) {
      options.autocomplete = this.getAutocompleteFunction(definition, definition.completions);
    }

    const cDescription = this.color('description');
    const cError = this.color('error');

    while (true) {
      this.inputArrange(definition);
      if (definition.description) {
        this.out(cDescription(definition.description));
      }
      const value = prompt(question, false, options);

      if (value === null) {
        return this.inputDisarrange(definition, value, value, true);
      }

      if (!definition.limit || definition.completions.indexOf(value) >= 0) {
        if (definition.fallback !== undefined && value === '') {
          return this.inputDisarrange(definition, value, definition.fallback, true);
        }
        return this.inputDisarrange(definition, value, value, true);
      }

      if (definition.fallback !== undefined && value === '') {
        return this.inputDisarrange(definition, value, definition.fallback, true);
      }

      this.out(cError('Invalid option [0]'), value);
      this.out(cError('Select one of [0]'), definition.completions);
      this.inputDisarrange(definition, value, value, false);
    }
  }

  inputArrange(definition) {

  }

  inputDisarrange(definition, input, value, returned = false) {
    this.out();
    return value;
  }

  passColor(value) {
    return value;
  }

  color(type) {
    switch (type) {
      case 'fallback':
        return color.cyan;
      case 'error':
        return color.redBright;
      case 'ask':
      case 'sep':
      case 'description':
      default:
        return this.passColor;
    }
  }

}
