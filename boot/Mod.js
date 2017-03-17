'use strict';

const path = require('path');
const glob = require('glob');

module.exports = class Mod {

  static setParserClass(Parser) {
    this._Parser = Parser;
  }

  constructor(root, name, settings) {
    this._root = path.normalize(root);
    this._name = name;
    this._info = require(path.join(this._root, this._name, 'info.json'));
    this._status = settings.modules[name];

    // caches
    this._annotations = undefined;
    this._parsers = undefined;
    this._caches = {};
  }

  root() {
    return this._root;
  }

  name() {
    return this._name;
  }

  info() {
    return this._info;
  }

  status() {
    return this._status;
  }

  getPath(...args) {
    args.unshift(this._root);
    return path.join.apply(path, args);
  }

  get(annotation) {
    if (this._caches[annotation] !== undefined) return this._caches[annotation];
    const parsers = this.getParsers();

    this._caches[annotation] = [];
    for (const index in parsers) {
      if (parsers[index].getDefinitions(annotation)) {
        this._caches[annotation].push(parsers[index]);
      }
    }
    return this._caches[annotation];
  }

  getAnnotations() {
    if (this._annotations !== undefined) return this._annotations;

    this._annotations = glob.sync('annotations/*.js', {
      cwd: this.getPath(this.name()),
      absolute: true,
    });
    return this._annotations;
  }

  getParsers() {
    if (this._parsers !== undefined) return this._parsers;

    const files = glob.sync('**/*.js', {
      cwd: this.getPath(this.name()),
      absolute: true,
    });
    this._parsers = [];
    for (const index in files) {
      this._parsers.push(new this.constructor._Parser(files[index]));
    }
    return this._parsers;
  }

};
