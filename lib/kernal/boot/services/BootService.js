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

  getClassesFromProvider(provider) {
    const data = {};
    const classes = this.booter().getClasses();

    for (const index in classes) {
      if (classes[index].providers && classes[index].providers.indexOf(provider) !== -1) {
        data[index] = classes[index];
      }
    }
    return data;
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
