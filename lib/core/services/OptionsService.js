'use strict';

/**
 * @Service(
 *   value = 'helper.options',
 *   description = 'Helper service for options.'
 * )
 *
 * @Inject('helper.boot')
 */
module.exports = class ModuleHelper {

  constructor() {
    this._list = {};
  }

  inject(boot) {
    this._boot = boot;
  }

  list(name) {
    if (this._list[name] !== undefined) return this._list[name];

    if (typeof this[name] === 'function') {
      this._list[name] = this[name].apply(this);
    }
    return this._list[name];
  }

  mods() {
    const list = [];
    const mods = this._boot.mods();

    for (const index in mods) {
      list.push(index);
    }
    return list;
  }

  services() {
    const list = [];
    const data = this._boot.provider('service').getData();

    for (const index in data) {
      list.push(index);
    }
    return list;
  }

}
