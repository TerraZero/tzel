'use strict';

/**
 * @Service(
 *   value = 'helper.mods',
 *   description = 'Helper service for module functions.'
 * )
 */
module.exports = class ModuleHelper {

  constructor() {
    this._completion = null;
  }

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

  completion() {
    if (!this._completion) {
      this._completion = [];
      const mods = boot.getMods();

      for (const index in mods) {
        this._completion.push(index);
      }
    }
    return this._completion;
  }

}
