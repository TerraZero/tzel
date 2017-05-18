'use strict';

const Annotation = require('tzero-annotations').Annotation;

/**
 * @Service(
 *   value = 'helper.options',
 *   description = 'Helper service for options.'
 * )
 *
 * @Inject('helper.boot')
 * @Inject('helper.mods')
 */
module.exports = class ModuleHelper {

  constructor() {
    this._list = {};
  }

  inject(boot, mods) {
    this._boot = boot;
    this._mods = mods;
  }

  list(name) {
    if (this._list[name] !== undefined) return this._list[name];

    if (typeof this[name] === 'function') {
      this._list[name] = this[name].apply(this);
    }
    return this._list[name];
  }

  listProviderOptions(provider) {
    const list = [];
    const data = this._boot.provider(provider).getData();

    for (const index in data) {
      list.push(index);
    }
    return list;
  }

  listClasses(annotation, type = Annotation.DEFINITION) {
    const parsers = this._mods.getAll(annotation, type);

    for (const mod in parsers) {
      for (const index in parsers[mod]) {
        const annotations = parsers[mod][index].get(annotation);

        for (const a in annotations) {
          log(annotations[a].getData());
        }
      }
    }
  }

  mods() {
    const list = [];
    const mods = this._boot.mods();

    for (const index in mods) {
      list.push(index);
    }
    return list;
  }

}
