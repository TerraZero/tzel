'use strict';

const Path = require('path');
const Mod = use('boot/Mod');

/**
 * @Service(
 *   value = 'boot',
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

  root(path) {
    if (path === undefined) {
      return this.booter().root();
    }
    return Path.join(this.booter().root(), path);
  }

  getSubject(cdata) {
    if (typeof cdata.class === 'string') {
      return use(cdata.class);
    }
    return null;
  }

}
