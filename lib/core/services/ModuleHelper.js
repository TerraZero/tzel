'use strict';

/**
 * @Service(
 *   value = 'helper.module',
 *   description = 'Helper service for module functions.'
 * )
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
