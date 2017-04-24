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

}
