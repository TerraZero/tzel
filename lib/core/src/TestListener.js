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
    log(event._args);
  }

  /**
   * @Listener('test.cool')
   *
   * @param {Event} event
   */
  test2(event) {
    log(event);
  }

}
