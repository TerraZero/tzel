'use strict';

module.exports = class DBField {

  constructor(name, table) {
    this._property = {};
    this._foreigns = [];
    this._table = table;

    this._type = null;
    this._length = null;
    this._increment = false;

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
    if (type === undefined) return this._type;
    this._type = type;
    return this;
  }

  value(value) {
    if (value === undefined) return this._property.defaultValue;
    this._property.defaultValue = value;
    return this;
  }

  isNotNull() {
    return this._property.notNull || false;
  }

  notNull(bool = true) {
    this._property.notNull = bool;
    return this;
  }

  isPrimary() {
    return this._property.primaryKey || false;
  }

  primary(bool = true) {
    this._property.primaryKey = bool;
    return this;
  }

  isIncrement() {
    return this._increment;
  }

  increment(bool = true) {
    this._increment = bool;
    return this;
  }

  length(length) {
    if (length === undefined) return this._length;
    this._length = length;
    return this;
  }

  prop() {
    this._property.dataType = this.type();
    if (this.length() !== null) {
      this._property.dataType += '(' + this.length() + ')';
    }
    if (this.isIncrement()) {
      this._property.dataType += ' AUTO_INCREMENT';
    }
    return this._property;
  }

  onDelete(field, action = 'cascade') {
    return this.link(field, 'onDelete', action);
  }

  onUpdate(field, action = 'cascade') {
    return this.link(field, 'onUpdate', action);
  }

  link(field, trigger = null, action = null) {
    return this.foreign(field.table().name(), field.name(), trigger, action);
  }

  foreign(table, field, trigger = null, action = null) {
    const foreign = {
      table: table,
      columns: [this.name()],
      refColumns: [field],
    };

    if (trigger !== null && action !== null) {
      foreign[trigger] = action;
    }
    this.foreigns().push(foreign);
    return this;
  }

  foreigns() {
    return this._foreigns;
  }

}
