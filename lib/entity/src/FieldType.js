'use strict';

/**
 * @Base('field')
 */
module.exports = class FieldType {

  constructor(data) {
    this._type = data.get('key');
  }

  type(field) {
    return this._type;
  }

  empty(field) {
    return [];
  }

  isEmpty(field, item, delta = 0) {
    return item.prop('values').length <= delta;
  }

  getProperty(field, item, name = null) {
    if (name === null) {
      return item.prop('value')[item.delta()];
    } else {
      return item.prop('value')[item.delta()][name];
    }
  }

  getValue(field, item) {
    return this.getProperty(field, item, 'value');
  }

  setValue(field, item, value) {
    item.prop('value')[item.delta()] = value;
  }

  create(field, value) {
    return {
      value: value,
    };
  }

  validate(field, validator, item, values) {
    if (item.length() > field.count()) {
      validator.break().add('field.validate').setItem(item).setType(1);
    }
  }

}
