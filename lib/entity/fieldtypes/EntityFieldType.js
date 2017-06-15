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

  validate(field, validator, item, values) {
    super.validate(field, validator, item, values);
    if (validator.isBreak(false)) return;
    const types = field.setting('types');

    if (types.indexOf(values.type) === -1) {
      validator.break().add('field.validate').setItem(item).setType(2).setArgs(values.type);
    }
  }

}
