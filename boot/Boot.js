'use strict';

const glob = require('glob');
const path = require('path');
const Mod = require('./Mod');

/**
 * @interface
 */
module.exports = class Boot {

  constructor(data) {
    this._data = data;
    this._mods = {
      mods: {},
      installed: {},
      enabled: {},
    };
    this._providers = {};
    this._annotationParser = null;
  }

  booting() {
    this.registerGlobals();
    this.bootMods();
    this.bootAnnotations();
    this.bootProviders();
  }

  bootMods() {
    const mods = this.findMods();

    this.registerMods(mods);
    this.installMods();
    this.enableMods();
  }

  findMods() {
    return glob.sync('**/info.json', {
      cwd: path.join(this._data.base, 'lib'),
      absolute: true,
    });
  }

  registerMods(mods) {
    for (const index in mods) {
      const root = path.dirname(mods[index]);
      const name = path.basename(root);
      const mod = new Mod(path.dirname(root), name, this._data.settings);

      this._mods.mods[name] = mod;
      if (mod.status() === 1) {
        this._mods.installed[name] = mod;
      }
      if (mod.status() === 2) {
        this._mods.enabled[name] = mod;
      }
    }
    if (this._mods.mods['core'].status() === 0) {
      this._mods.enabled['core'] = this._mods.mods['core'];
    }
    if (this._mods.mods['command'].status() === 0) {
      this._mods.enabled['command'] = this._mods.mods['command'];
    }
  }

  installMods() {
    // TODO
  }

  enableMods() {
    // TODO
  }

  bootAnnotations() {
    this._annotationParser = require('./AnnotationParser');
    Mod.setParserClass(this.getParserClass());
    const annotations = this.findAnnotations();
    this.registerAnnotations(annotations);
  }

  getParserClass() {
    return this._annotationParser;
  }

  findAnnotations() {
    const annotations = [];

    for (const index in this._mods.enabled) {
      const files = this._mods.enabled[index].getAnnotations();

      for (const f in files) {
        annotations.push(files[f]);
      }
    }
    return annotations;
  }

  registerAnnotations(annotations) {
    for (const index in annotations) {
      const annotation = require(annotations[index]);

      this._annotationParser.register(annotations[index]);
    }
  }

  bootProviders() {
    const providers = this.findProviders();

    this.registerProviders(providers);
  }

  findProviders() {
    const providers = [];
    const ProviderAnnotation = use('core/annotations/Provider');

    for (const index in this._mods.enabled) {
      const parsers = this._mods.enabled[index].get(ProviderAnnotation);

      for (const p in parsers) {
        providers.push(new (require(parsers[p].getPath()))(parsers[p], this._mods.enabled[index], parsers[p].getPath()));
      }
    }
    return providers;
  }

  registerProviders(providers) {
    const Injector = use('service/Injector');

    providers.sort(function (a, b) {
      return a.getWeight() - b.getWeight();
    });

    for (const index in providers) {
      Injector.directInject(providers[index], providers[index].getPath());
      providers[index].startRegister(this);
      this._providers[providers[index].protocol()] = providers[index];
    }
  }

  use(file) {
    const parts = file.split('::');
    if (parts.length > 1) return this.provide(parts);

    file = path.normalize(file);
    const name = file.split(path.sep)[0];

    if (this._mods.enabled[name]) {
      const mod = this._mods.enabled[name];
      const subject = require(mod.getPath(file));

      if (typeof subject.struct === 'function') {
        subject.struct.call(subject);
      }
      return subject;
    }
    return null;
  }

  provide(parts) {
    if (this._providers[parts[0]] === undefined) {
      this.error('Provider "' + parts[0] + '" not defined for load string "' + parts.join('::') + '"');
    }
    return this._providers[parts[0]].provide(parts[1]);
  }

  base(...args) {
    const norm = path.normalize(path.join.apply(path, args));

    if (path.isAbsolute(norm)) {
      return norm;
    } else {
      args.unshift(this._data.base);
      return path.normalize(path.join.apply(path, args));
    }
  }

  registerGlobals() {
    const that = this;

    global.use = function use(...args) {
      return that.use.apply(that, args);
    };
    global.base = function base(...args) {
      return that.base.apply(that, args);
    };
    global.log = function log(...args) {
      console.log.apply(console, args);
    };
    global.boot = this;
  }

  getProviders() {
    return this._providers;
  }

  getMods(status = 'enabled') {
    return this._mods[status];
  }

  error(message) {
    throw new Error(message);
  }

  annotationParser() {
    return this._annotationParser;
  }

  getSettings() {
    return this._data.settings;
  }

};
