'use strict';

const path = require('path');
const glob = require('glob');
const Annotation = require('tzero-annotations').Annotation;

const AnnotationParser = use('boot/AnnotationParser');

module.exports = class Mod {

  static get ENABLED() {
    return 2;
  }

  static get INSTALLED() {
    return 1;
  }

  static get UNINSTALLED() {
    return 0;
  }

  constructor(root, name, settings, boot) {
    this._root = path.normalize(root);
    this._name = name;
    this._info = require(path.join(this._root, this._name, 'info.json'));
    if (name === 'core' || name === 'command' || name === 'boot') {
      this._status = Mod.ENABLED;
    } else {
      this._status = settings.modules[name] || Mod.UNINSTALLED;
    }
    this._boot = boot;

    // caches
    this._annotations = undefined;
    this._parsers = undefined;
    this._caches = {};
    this._templates = undefined;
    this._styles = undefined;
  }

  root() {
    return this._root;
  }

  base() {
    return this.root() + '/' + this.name();
  }

  name() {
    return this._name;
  }

  info() {
    return this._info;
  }

  getInfo(value) {
    return this._info[value];
  }

  status() {
    return this._status;
  }

  isEnabled() {
    return this.status() === Mod.ENABLED;
  }

  getPath(file) {
    return this._boot.getPath(this.name() + '/' + file);
  }

  get(annotation, type = Annotation.DEFINITION) {
    if (this._caches[type] !== undefined && this._caches[type][annotation] !== undefined) return this._caches[type][annotation];
    const parsers = this.getParsers();

    if (this._caches[type] === undefined) this._caches[type] = {};
    this._caches[type][annotation] = [];
    for (const index in parsers) {
      if (parsers[index].get(type, annotation)) {
        this._caches[type][annotation].push(parsers[index]);
      }
    }
    return this._caches[type][annotation];
  }

  getAnnotations() {
    if (this._annotations !== undefined) return this._annotations;

    this._annotations = glob.sync('annotations/**/*.js', {
      cwd: this.base(),
      absolute: true,
    });
    return this._annotations;
  }

  getParsers() {
    if (this._parsers !== undefined) return this._parsers;

    const files = glob.sync('**/*.js', {
      cwd: this.base(),
      absolute: true,
    });

    this._parsers = [];
    for (const index in files) {
      this._parsers.push(new AnnotationParser(files[index]));
    }
    return this._parsers;
  }

  getTemplates() {
    if (this._templates !== undefined) return this._templates;

    this._templates = glob.sync('**/*.pug', {
      cwd: this.getPath('templates'),
      absolute: true,
    });
    return this._templates;
  }

};
