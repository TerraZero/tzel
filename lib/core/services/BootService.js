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

}
