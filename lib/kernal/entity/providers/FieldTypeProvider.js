'use strict';

const SimpleProvider = use('boot/SimpleProvider');
const FieldType = use('entity/annotations/FieldType');

/**
 * @Provider('field')
 */
module.exports = class FieldTypeProvider extends SimpleProvider.class {

  getAnnotation() {
    return FieldType.class;
  }

  scanning(parser, data, annotation) {
    data.set('key', annotation.value);
  }

}
