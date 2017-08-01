'use strict';

const Data = use('core/Data');

/**
 * @Service(
 *   value = 'settings',
 *   description = 'Simple settings access.'
 * )
 */
module.exports = class SettingsService {

  constructor() {
    this._settings = null;
  }

  /**
   * @Inject('boot')
   */
  inject(boot) {
    this._boot = boot;
  }

  settings() {
    if (this._settings !== null) return this._settings;
    this._settings = new Data(this._boot.settings());
    return this._settings;
  }

  get(name, fallback = null) {
    return this.settings().get(name, fallback);
  }

}
