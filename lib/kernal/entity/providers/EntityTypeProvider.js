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
    data.set('creator', this.provider());

    data.set('key', annotation.value);
    data.set('storage', annotation.storage);
  }

  create(subject, data, args) {
    return new subject(data);
  }

}
