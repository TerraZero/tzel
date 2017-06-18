'use strict';

module.exports = class DBField {

  constructor(name) {
    this._property = {};

    this.name(name);
  }

  name(name) {
    this._property.name = name;
    return this;
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

}
