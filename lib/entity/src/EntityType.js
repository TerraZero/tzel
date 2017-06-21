'use strict';

const Entity = use('entity/src/Entity');
const Field = use('entity/src/Field');

/**
 * @Base('entity')
 */
module.exports = class EntityType {

  constructor(data, norm) {
    this._type = data.get('key');
    this._fields = {};
    this._norm = norm;
  }

  init() {

  }

  id(entity) {
    return entity.get('id');
  }



  addField(name, field, settings) {
    this._fields[name] = new Field(name, field, settings, this);
    return this._fields[name];
  }



  type() {
    return this._type;
  }

  fields() {
    return this._fields;
  }

  values() {
    const values = {};

    for (const field in this.fields()) {
      values[field] = [];
    }
    return values;
  }



  create(values) {
    const entity = new Entity(this);

    if (this._norm.isObject(values)) {
      for (const field in values) {
        entity.get(field).set(values[field]);
      }
    } else {
      this.id(entity).set(values);
    }
    return entity;
  }

}
