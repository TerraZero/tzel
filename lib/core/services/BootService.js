'use strict';

/**
 * @Service(
 *   value = 'helper.boot',
 *   description = 'Boot helper service.'
 * )
 */
module.exports = class BootService {

  constructor(booter) {
    this._booter = booter;

    this._list = {};
  }

  booter() {
    return this._booter;
  }

  mods() {
    return this._booter.getMods();
  }

  provider(name) {
    const providers = this._booter.getProviders();

    return providers[name];
  }

  settings() {
    return this._booter.getSettings();
  }

  getProviderData(provider, data) {
    return this.provider(provider).getData(data);
  }

  getListCache(name) {
    return this._list[name];
  }

  setListCache(name, value) {
    return this._list[name] = value;
  }

  listMods() {
    if (!this.getListCache('mods')) {
      const list = [];
      const mods = boot.getMods();

      for (const index in mods) {
        list.push(index);
      }
      this.setListCache('mods', list);
    }
    return this.getListCache('mods');
  }

  listServices() {
    if (!this.getListCache('services')) {
      const list = [];
      const data = this.provider('service').getData();

      for (const index in data) {
        list.push(index);
      }
      this.setListCache('services', list);
    }
    return this.getListCache('services');
  }

}
