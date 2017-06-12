'use strict';

module.exports = class FieldType {

  constructor(type) {
    this._type = type;
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
    if (this.type() === 'entity') {
      return {
        value: value.value,
        type: value.type,
      };
    }
    return {
      value: value,
    };
  }

}
