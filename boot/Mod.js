'use strict';

const path = require('path');
const glob = require('glob');

module.exports = class Mod {

  constructor(root, name, settings) {
    this._root = path.normalize(root);
    this._name = name;
    this._info = require(path.join(this._root, this._name, 'info.json'));
    this._status = settings.modules[name];

    this._providers = undefined;
    this._annotations = undefined;
    this._files = undefined;
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

  getProviders() {
    if (this._providers !== undefined) return this._providers;
    this._providers = null;
    if (this._info.providers) {
      this._providers = [];
      for (const index in this._info.providers) {
        this._providers.push(this.getPath(this.name(), this._info.providers[index]));
      }
    }
    return this._providers;
  }

  getAnnotations() {
    if (this._annotations !== undefined) return this._annotations;
    this._annotations = glob.sync('annotations/*.js', {
      cwd: this.getPath(this.name()),
      absolute: true,
    });
    return this._annotations;
  }

  getFiles() {
    if (this._files !== undefined) return this._files;
    this._files = glob.sync('**/*.js', {
      cwd: this.getPath(this.name()),
      absolute: true,
    });
    return this._files;
  }

};
