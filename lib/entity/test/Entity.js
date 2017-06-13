'use strict';

const FieldItems = use('entity/test/FieldItems');

module.exports = class Entity {

  constructor(type) {
    this._type = type;

    this._properties = {
      type: type.fields(),
      value: type.values(),
      item: {},
    }
  }

  type() {
    return this.definition().type();
  }

  definition() {
    return this._type;
  }

  get(field) {
    const item = this.prop('item', field);

    if (item === null) {
      return this.prop('item', field, new FieldItems(this, field));
    }
    return item;
  }

  prop(property, field, set) {
    if (set === undefined) {
      if (this._properties[property][field] === undefined) return null;
      return this._properties[property][field];
    } else {
      this._properties[property][field] = set;
      return set;
    }
  }

  id() {
    return this.definition().id(this).value();
  }

  getEntityType() {
    return this.definition().constructor.name;
  }

  inspect() {
    return this.getEntityType() + '[' + this.id() + ']';
  }

}
