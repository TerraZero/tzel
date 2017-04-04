'use strict';

/**
 * @Service('helper.module')
 */
module.exports = class ModuleHelper {

  getModOfFile(file) {
    const path = base(file);
    const mods = boot.getMods();

    for (const index in mods) {
      if (path.startsWith(mods[index].getBase())) {
        return mods[index];
      }
    }
    return null;
  }

}