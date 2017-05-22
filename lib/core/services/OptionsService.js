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

  listBases(type) {
    const list = [];
    const data = this._boot.provider('base').getData();

    for (const index in data) {
      if (data[index].get('base').value.startsWith(type)) {
        list.push(index);
      }
    }
    return list;
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
