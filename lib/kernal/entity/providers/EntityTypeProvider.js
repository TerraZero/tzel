'use strict';

const SimpleProvider = use('boot/SimpleProvider');
const EntityType = use('entity/annotations/EntityType');

/**
 * @Provider('entity')
 */
module.exports = class EntityTypeProvider extends SimpleProvider.class {

  getAnnotation() {
    return EntityType.class;
  }

  scanning(parser, data, annotation) {
    data.set('key', annotation.value);
    data.set('storage', annotation.storage);
  }

}
