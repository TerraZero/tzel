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
    this._annotations = {};
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
  }

  installMods() {
    // TODO
  }

  enableMods() {
    // TODO
  }

  bootAnnotations() {
    this._annotationParser = require('./AnnotationParser');
    const annotations = this.findAnnotations();
    this.registerAnnotations(annotations);
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
      this._annotations[annotation.name] = annotation;
    }
  }

  bootProviders() {
    const Data = use('core/Data');
    const providers = this.findProviders();
    this.registerProviders(providers);
    const files = this.findFiles();
    this.initProvider(files, Data);
  }

  findProviders() {
    const providers = [];

    for (const index in this._mods.enabled) {
      const files = this._mods.enabled[index].getProviders();

      for (const f in files) {
        providers.push(new (require(files[f]))());
      }
    }
    return providers;
  }

  registerProviders(providers) {
    for (const index in providers) {
      this._providers[providers[index].protocol()] = providers[index];
    }
  }

  findFiles() {
    const files = [];

    for (const index in this._mods.enabled) {
      const modFiles = this._mods.enabled[index].getFiles();

      for (const modFile in modFiles) {
        files.push(modFiles[modFile]);
      }
    }
    return files;
  }

  initProvider(files, Data) {
    for (const index in files) {
      const data = new Data();
      const parser = new this._annotationParser(files[index]);

      for (const provider in this._providers) {
        if (this._providers[provider].accept(data, files[index], parser)) {
          this._providers[provider].prepare(data, files[index], parser);
        }
      }
    }
  }

  use(file) {
    file = path.normalize(file);
    const parts = file.split(path.sep);

    if (this._mods.enabled[parts[0]]) {
      const mod = this._mods.enabled[parts[0]];
      return require(mod.getPath(file));
    }
    return null;
  }

  load(string) {
    const parts = string.split(':');
    const protocol = parts[0];

    return this._providers[protocol].invoke(parts[1], null);
  }

  base(...args) {
    args.unshift(this._data.base);
    return path.join.apply(path, args);
  }

  registerGlobals() {
    const that = this;

    global.use = function use(...args) {
      return that.use.apply(that, args);
    };
    global.load = function load(...args) {
      return that.load.apply(that, args);
    };
    global.base = function base(...args) {
      return that.base.apply(that, args);
    };
    global.tzel = {
      boot: this,
    };
  }

};
