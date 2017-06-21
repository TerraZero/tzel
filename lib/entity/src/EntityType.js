'use strict';

const Entity = use('entity/src/Entity');
const Field = use('entity/src/Field');

/**
 * @Base('entity')
 */
module.exports = class EntityType {

  constructor(data, norm) {
    this._type = data.get('key');
    this._table = data.get('annotation').storage || this._type;
    this._fields = {};
    this._norm = norm;
  }

  init() {

  }

  idField() {
    return this._fields['id'];
  }

  id(entity) {
    return entity.get(this.idField().name());
  }



  addField(name, field, settings) {
    this._fields[name] = new Field(name, field, settings, this);
    return this._fields[name];
  }



  type() {
    return this._type;
  }

  field(name) {
    return this.fields()[name];
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



  table() {
    return this._table;
  }

  addStore(db) {
    const table = db.addTable(this.table());

    this.store(table, db);
    return table;
  }

  store(table, db) { }

}
