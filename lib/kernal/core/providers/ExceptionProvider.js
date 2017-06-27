'use strict';

const SimpleProvider = use('core/SimpleProvider');
const Exception = use('core/annotations/Exception');

/**
 * @Provider(
 *   value='exception',
 *   weight=-900
 * )
 */
module.exports = class ExceptionProvider extends SimpleProvider.class {

  getAnnotation() {
    return Exception.class;
  }

  scanning(parser, data, annotation) {
    data.set('key', annotation.value);
  }

}
