'use strict';

module.exports = class FieldType {

  constructor(type) {
    this._type = type;
  }

  type() {
    return this._type;
  }

  isEmpty(item, delta = 0) {
    return item.prop('values').length <= delta;
  }

  getProperty(item, name = null) {
    if (name === null) {
      return item.prop('values')[item.delta()];
    } else {
      return item.prop('values')[item.delta()][name];
    }
  }

  getValue(item) {
    if (this.type() === 'entity') {
      const Entity = use('entity/test/Entity');

      return new Entity(this.getProperty(item, 'value'));
    }
    return this.getProperty(item, 'value');
  }

  setValue(item, value) {
    item.prop('values')[item.delta()] = value;
  }

  create(value) {
    if (this.type() === 'entity') {
      const Entity = use('entity/test/Entity');

      if (value instanceof Entity) {
        return {
          value: value.get('id').value(),
          type: value.constructor.name,
        };
      }
      return value;
    }

    return {
      value: value,
    };
  }

}
