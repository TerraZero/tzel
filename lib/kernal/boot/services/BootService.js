'use strict';

/**
 * @Service(
 *   value = 'helper.boot',
 *   description = 'Boot helper service.'
 * )
 */
module.exports = class BootService {

  booter() {
    return use.boot;
  }

  mods(status = Mod.ENABLED) {
    return this.booter().getMods(status);
  }

  provider(name) {
    const providers = this.booter().getProviders();

    return providers[name];
  }

  providers() {
    return this.booter().getProviders();
  }

  registry() {
    return this.booter().annotationParser().registry();
  }

  settings() {
    return this.booter().getSettings();
  }

  getProviderData(provider, data) {
    return this.provider(provider).getData(data);
  }

}
