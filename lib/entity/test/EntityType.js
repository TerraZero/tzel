'use strict';

const Entity = use('entity/test/Entity');

/**
 * @Base('entity')
 */
module.exports = class EntityType {

  constructor(data) {
    this._type = data.get('key');
    this._fields = {};
  }

  init() {

  }

  id(entity) {
    return entity.get('id');
  }



  addField(name, field) {
    this._fields[name] = field;
  }



  type() {
    return this._type;
  }

  fields() {
    return this._fields;
  }

  values() {
    const values = {};
    const fields = this.fields();

    for (const field in fields) {
      values[field] = fields[field].empty();
    }
    return values;
  }



  create(values) {
    const entity = new Entity(this);

    if (this.isObject(values)) {
      for (const field in values) {
        entity.get(field).set(values[field]);
      }
    } else {
      this.id(entity).set(values);
    }
    return entity;
  }

  isObject(object) {
    return !!object && object.constructor === Object;
  }

}
