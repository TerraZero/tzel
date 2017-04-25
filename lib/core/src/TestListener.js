'use strict';

/**
 * @Inject('helper.boot')
 */
module.exports = class TestListener {

  inject(boot) {
    this._boot = boot;
  }

  /**
   * @Listener('test')
   *
   * @param {Event} event
   */
  test(event) {
    log(event);
  }

}
