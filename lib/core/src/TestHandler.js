'use strict';

/**
 * @Handler('test')
 *
 * @Inject('helper.module')
 */
module.exports = class TestHandler {

  inject(mods) {
    this._mods = mods;
  }

  /**
   * @Event('myevent')
   *
   * @param {Event} e
   */
  myevent(e) {
    log(e);
    log(this._mods);
  }

}
