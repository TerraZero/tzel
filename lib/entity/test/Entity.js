'use strict';

const FieldType = use('entity/test/FieldType');
const FieldItems = use('entity/test/FieldItems');

/**
 * @Base('entity')
 */
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

  hasField(field) {
    return this._infos[field] !== undefined;
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

}
