'use strict';

/**
 * @Base('field')
 */
module.exports = class FieldType {

  constructor(data, norm) {
    this._type = data.get('key');
    this._norm = norm;
  }

  type(field) {
    return this._type;
  }

  isEmpty(field, item, delta = 0) {
    return item.prop('value').length <= delta;
  }

  prop(field, item, name = null) {
    if (name === null) {
      return item.get();
    } else {
      return item.get(name);
    }
  }

  get(field, item) {
    return this.prop(field, item, 'value');
  }

  create(field, value) {
    if (!this._norm.isObject(value)) {
      value = { value: value };
    }
    const define = this.define();
    const create = {};

    for (const index in define) {
      if (value[index] === undefined) {
        create[index] = define[index][1];
      } else {
        create[index] = value[index];
      }
    }
    return create;
  }

  define() {
    return {
      value: ['any', null],
    };
  }

  validate(field, validator, item, value) {
    if (item.length() > field.count()) {
      validator.break().add('field.validate').setItem(item).setType(1);
    }
    const define = this.define();

    for (const index in define) {
      if (!this._norm.is(define[index][0], value[index])) {
        validator.break().add('field.validate').setType(2).setItem(item).setArgs(value[index], index, this._norm.label(define[index][0]));
      }
    }
  }

  defaultSettings() {
    return {};
  }

  hasStore(field) {
    return field.count() > 1;
  }

  addStore(field, db) {
    const table = db.addTable(field.entityType().type() + '__' + field.name());

    table.addField('id', 'int', true, true);
    table.addField('delta', 'int').notNull();
    this.store(field, table, db);
  }

  store(field, table, db) { }

}
