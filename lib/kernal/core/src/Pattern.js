'use strict';

const Matcher = require('url-pattern');

module.exports = class Pattern {

  constructor(pattern) {
    this._matcher = new Matcher(pattern);
    this._optionals = {};
    this._values = [];
    this._levels = 0;

    for (const index in this._matcher.ast) {
      if (this._matcher.ast[index].tag === 'static') continue;

      if (Array.isArray(this._matcher.ast[index].value)) {
        this.initValues(this._matcher.ast[index].value);
      } else {
        if (this._matcher.ast[index].tag === 'named') {
          this._values.push(this._matcher.ast[index].value);
        }
      }
    }
  }

  initValues(values, level = 1) {
    for (const index in values) {
      if (values[index].tag === 'static') continue;

      if (Array.isArray(values[index].value)) {
        this.initValues(values[index].value, level + 1);
      } else {
        this._optionals[values[index].value] = level;
        if (this._levels < level) {
          this._levels = level;
        }
      }
    }
  }

  matcher() {
    return this._matcher;
  }

  check(string) {
    return this.parse(string) !== null;
  }

  generate(args = {}, level = -1) {
    if (level === -1) {
      return this.matcher().stringify(args);
    }
    return this.matcher().stringify(this.filter(args, level));
  }

  match(string) {
    return this.matcher().match(string);
  }

  matchOne(strings = []) {
    for (let i = strings.length - 1; i >= 0; i--) {
      const matching = this.match(strings[i]);

      if (matching !== null) return matching;
    }
    return null;
  }

  values() {
    return this._values;
  }

  optionals(level = -1) {
    if (level === -1) return this._optionals;

    const filtered = {};
    for (const index in this._optionals) {
      if (this._optionals[index] > level) continue;
      filtered[index] = this._optionals[index];
    }
    return filtered;
  }

  levels() {
    return this._levels;
  }

  filter(args = {}, level = -1) {
    const filtered = {};

    const values = this.values();
    for (const index in values) {
      if (!this.isArg(args[values[index]])) continue;
      filtered[values[index]] = args[values[index]];
    }

    const optionals = this.optionals(level);
    for (const index in optionals) {
      if (!this.isArg(args[index])) continue;
      filtered[index] = args[index];
    }

    return filtered;
  }

  generateAll(args = {}, level = -1) {
    if (level === -1) level = this.getDeepestLevel(args);
    const generates = [];

    for (let i = 0; i <= level; i++) {
      generates.push(this.generate(args, i));
    }
    return generates;
  }

  getDeepestLevel(args = {}) {
    const levels = {};
    for (let i = 0; i <= this.levels(); i++) {
      levels[i] = false;
    }

    const optionals = this.optionals();
    for (const index in optionals) {
      if (!this.isArg(args[index])) {
        levels[optionals[index]] = true;
      }
    }

    for (let i = 0; i <= this.levels(); i++) {
      if (levels[i]) return i - 1;
    }
    return this.levels();
  }

  getKey(args, level = -1) {
    if (level === -1) level = this.getDeepestLevel(args);
    return this.generate(args, level);
  }

  isArg(value) {
    return value !== undefined && value !== null;
  }

}
