'use strict';

const Annotation = require('tzero-annotations').Annotation;

/**
 * @Service(
 *   value = 'helper.mods',
 *   description = 'Helper service for module functions.'
 * )
 *
 *
 */
module.exports = class ModuleHelper {

  /**
   * @Inject('helper.boot')
   */
  inject(boot) {
    this._boot = boot;
  }

  getModOfFile(file) {
    const path = base(file);
    const mods = this._boot.mods();

    for (const index in mods) {
      if (path.startsWith(mods[index].getBase())) {
        return mods[index];
      }
    }
    return null;
  }

  getAll(annotation, type = Annotation.DEFINITION) {
    const parsers = {};
    const mods = this._boot.mods();

    for (const index in mods) {
      const modParsers = mods[index].get(annotation, type);

      if (modParsers.length) {
        parsers[index] = modParsers;
      }
    }
    return parsers;
  }

}
