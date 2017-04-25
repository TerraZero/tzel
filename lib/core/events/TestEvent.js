'use strict';

const Event = use('core/Event');

/**
 * @Event('test')
 *
 * @Inject('helper.boot')
 */
module.exports = class TestEvent extends Event {

  inject(boot) {
    this._boot = boot;
  }

}
