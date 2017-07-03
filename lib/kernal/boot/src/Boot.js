'use strict';

const glob = require('glob');
const path = require('path');
const Mod = require('./Mod');

const AnnotationParser = use('boot/AnnotationParser');
const Data = use('core/Data');

/**
 * @interface
 */
module.exports = class Boot {

  constructor(data) {
    this._data = data;
    this._cache = {
      mods: {},
    };

    this._mods = {};

    this._providers = {};
    this._classes = {};
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
      cwd: path.join(this.root(), 'lib'),
      absolute: true,
    });
  }

  registerMods(mods) {
    for (const index in mods) {
      const root = path.dirname(mods[index]);
      const name = path.basename(root);

      this._mods[name] = new Mod(path.dirname(root), name, this._data.settings, this);
    }
  }

  installMods() {
    // TODO
  }

  enableMods() {
    // TODO
  }

  bootAnnotations() {
    const annotations = this.findAnnotations();
    this.registerAnnotations(annotations);
  }

  findAnnotations() {
    const annotations = [];

    for (const index in this._mods) {
      if (!this._mods[index].isEnabled()) continue;

      const files = this._mods[index].getAnnotations();

      for (const f in files) {
        annotations.push(files[f]);
      }
    }
    return annotations;
  }

  registerAnnotations(annotations) {
    for (const index in annotations) {
      AnnotationParser.register(annotations[index]);
    }
  }

  bootProviders() {
    const providers = this.findProviders();

    this.registerProviders(providers);
    this.registerClasses();
  }

  findProviders() {
    const providers = [];
    const ProviderAnnotation = use('boot/annotations/Provider');

    for (const index in this._mods) {
      if (!this._mods[index].isEnabled()) continue;
      const parsers = this._mods[index].getParsers();

      for (const p in parsers) {
        const annotation = parsers[p].getDefinitions(ProviderAnnotation.class, 0);

        if (annotation) {
          providers.push(new (require(parsers[p].getPath()))(annotation));
        }
      }
    }
    return providers;
  }

  registerProviders(providers) {
    providers.sort(function (a, b) {
      return a.weight() - b.weight();
    });

    for (const index in providers) {
      this._providers[providers[index].provider()] = providers[index];
    }
  }

  registerClasses() {
    const extender = use('service::annotation.extender');

    for (const name in this._mods) {
      if (!this._mods[name].isEnabled()) continue;
      const parsers = this._mods[name].getParsers();
      const sub = this._mods[name].base().length;

      for (const index in parsers) {
        const data = new Data({
          file: parsers[index].getPath().substring(0, parsers[index].getPath().length - 3),
          mod: name,
        });
        data.set('id', this.toKey(data.get('file')));
        data.add('keys', data.get('file').substring(sub + 1, data.get('file').length));

        for (const provider in this._providers) {
          this._providers[provider].scan(parsers[index], data, name);
        }
        this._classes[data.get('id')] = data.all();
      }
    }

    for (const index in this._classes) {
      this.registerClassesExtender(extender, this._classes[index]);
    }
  }

  registerClassesExtender(extender, data) {
    if (data.extended !== undefined) return;
    data.extended = {
      use: extender.getExtend(data.file),
      file: null
    };

    if (data.extended.use !== null) {
      data.extended.id = use(data.extended.use).__id;
      this.registerClassesExtender(extender, this._classes[data.extended.id]);

      for (const index in this._providers) {
        this._providers[index].extend(data, this._classes[data.extended.id]);
      }
    }
  }

  getData(string) {
    let file = null;

    if (string.split('::').length === 1) {
      file = this.getPath(string);
    } else {
      file = this.getPathFromKey(string);
    }
    const key = this.toKey(file);

    if (this._classes[key] === undefined) {
      this._classes[key] = {
        id: key,
        file: file,
        keys: [string],
      };
    }
    return this._classes[key];
  }

  toKey(string) {
    return string.replace(/\\/g, '/');
  }

  getPathFromKey(string) {
    for (const index in this._classes) {
      if (this._classes[index].keys.indexOf(string) !== -1) {
        return this._classes[index].file;
      }
    }
    return null;
  }

  getPath(file) {
    const parts = file.split('/');
    const mod = this.getMod(parts[0]);

    // add src directory for direct files
    if (parts.length === 2) {
      parts.splice(1, 0, 'src');
    }

    // add root directory for absolute paths
    if (mod === null) {
      parts.unshift(this.root());
    } else {
      parts.unshift(mod.root());
    }

    return path.normalize(path.join.apply(path, parts));
  }

  provide(subject, data, args = []) {
    if (data.providers === undefined) return subject;

    let object = null;
    if (data.creator === undefined) {
      object = Reflect.construct(subject, args, subject);
    } else {
      object = this._providers[data.creator].create(subject, data, args);
    }
    for (const index in data.providers) {
      this._providers[data.providers[index]].provide(subject, data, object);
    }
    if (data.alters) {
      for (const index in data.alters) {
        this._providers[data.alters[index]].alter(subject, data, object);
      }
    }
    return object;
  }

  root() {
    return this._data.base;
  }

  registerGlobals() {
    const that = this;

    global.log = function log(...args) {
      console.log.apply(console, args);
    };
    global.boot = this;
  }

  getProviders() {
    return this._providers;
  }

  getMod(name, status = Mod.ENABLED) {
    if (this._mods[name] && this._mods[name].status() === status) {
      return this._mods[name];
    }
    return null;
  }

  getMods(status = Mod.ENABLED) {
    if (this._cache.mods[status] === undefined) {
      this._cache.mods[status] = {};
      for (const index in this._mods) {
        if (this._mods[index].status() === status) {
          this._cache.mods[status][index] = this._mods[index];
        }
      }
    }
    return this._cache.mods[status];
  }

  error(message) {
    throw new Error(message);
  }

  getSettings() {
    return this._data.settings;
  }

  getClasses() {
    return this._classes;
  }

};
