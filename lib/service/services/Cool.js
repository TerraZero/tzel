'use strict';

/**
 * @Service('cool')
 * @Inject('test')
 */
module.exports = class Cool {

  inject(test) {
    this._test = test;
  }

}
