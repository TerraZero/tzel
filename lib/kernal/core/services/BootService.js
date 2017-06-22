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

  mods(status = 'enabled') {
    return this._booter.getMods(status);
  }

  provider(name) {
    const providers = this._booter.getProviders();

    return providers[name];
  }

  providers() {
    return this._booter.getProviders();
  }

  registry() {
    return this._booter.annotationParser().registry();
  }

  settings() {
    return this._booter.getSettings();
  }

  getProviderData(provider, data) {
    return this.provider(provider).getData(data);
  }

}
