'use strict';

/**
 * @Base('field')
 */
module.exports = class FieldType {

  constructor(data) {
    this._type = data.get('key');
  }

  type() {
    return this._type;
  }

  empty() {
    return [];
  }

  isEmpty(item, delta = 0) {
    return item.prop('values').length <= delta;
  }

  getProperty(item, name = null) {
    if (name === null) {
      return item.prop('value')[item.delta()];
    } else {
      return item.prop('value')[item.delta()][name];
    }
  }

  getValue(item) {
    return this.getProperty(item, 'value');
  }

  setValue(item, value) {
    item.prop('value')[item.delta()] = value;
  }

  create(value) {
    return {
      value: value,
    };
  }

  validate(field, value) {

  }

}
