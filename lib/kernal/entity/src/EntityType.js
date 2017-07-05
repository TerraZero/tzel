'use strict';

const Entity = use('entity/src/Entity');
const Field = use('entity/src/Field');

module.exports = class EntityType {

  constructor(data) {
    this._type = data.key;
    this._table = data.storage || data.key;
    this._fields = {};
  }

  /**
   * @Inject('helper.norm')
   */
  inject(norm) {
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

  load(db, id) {
    let base = db[this.table()];
    const fields = this.fields();
    const select = base.select(base.id);

    for (const index in fields) {
      base = fields[index].definition().load(fields[index], select, db, base);
    }

    select
      .from(base)
      .where(db.node.id.equals(id));

    return select;
  }

}
