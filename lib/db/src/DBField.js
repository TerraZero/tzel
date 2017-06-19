'use strict';

module.exports = class DBField {

  constructor(name, table) {
    this._property = {};
    this._foreign = null;
    this._table = table;

    this.name(name);
  }

  name(name) {
    if (name === undefined) return this._property.name;
    this._property.name = name;
    return this;
  }

  table() {
    return this._table;
  }

  type(type) {
    this._property.dataType = type;
    return this;
  }

  value(value) {
    this._property.defaultValue = value;
    return this;
  }

  notNull(bool = true) {
    this._property.notNull = bool;
    return this;
  }

  primary(bool = true) {
    this._property.primaryKey = bool;
    return this;
  }

  prop() {
    return this._property;
  }

  link(field) {

  }

  foreign(table, field, trigger = null, action = null) {
    if (table === undefined) return this._foreign;

    this._foreign = {
      table: table,
      column: field,
      trigger: trigger,
      action: action,
    };
    return this;
  }

}
