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

  create(value) {
    return {
      value: value.value,
      type: value.type,
    };
  }

  getValue(item) {
    const prop = this.getProperty(item);

    return this._manager.load(prop.type, prop.value);
  }

}
