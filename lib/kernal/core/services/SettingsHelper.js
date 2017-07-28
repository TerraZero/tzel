'use strict';

const AccessData = use('core/src/AccessData');

/**
 * @Service(
 *   value = 'settings',
 *   description = 'Simple settings access.'
 * )
 */
module.exports = class SettingsHelper {

  constructor(booter) {
    this._settings = new AccessData(booter.getSettings());
  }

  get(name, fallback = null) {
    return this._settings.get(name, fallback);
  }

}
