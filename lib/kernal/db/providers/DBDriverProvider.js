'use strict';

const SimpleProvider = use('boot/SimpleProvider');
const DBDriver = use('db/annotations/DBDriver');

/**
 * @Provider('dbdriver')
 */
module.exports = class DBDriverProvider extends SimpleProvider.class {

  getAnnotation() {
    return DBDriver.class;
  }

  scanning(parser, data, annotation) {
    data.set('key', annotation.value);
  }

}
