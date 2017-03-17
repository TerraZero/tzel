'use strict';

/**
 * @Service('test')
 * @Inject('cool')
 */
module.exports = class Test {

  inject(cool) {
    this._cool = cool;
  }

}
