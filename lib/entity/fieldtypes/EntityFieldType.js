'use strict';

const FieldType = use('entity/test/FieldType');

/**
 * @FieldType('entity')
 *
 * @Inject('manager.entity')
 */
module.exports = class EntityFieldType extends FieldType {

  inject(manager) {
    this._manager = manager;
  }

  create(field, value) {
    return {
      value: value.value,
      type: value.type,
    };
  }

  getValue(field, item) {
    const prop = this.getProperty(field, item);

    return this._manager.load(prop.type, prop.value);
  }

}
