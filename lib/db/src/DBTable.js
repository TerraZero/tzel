'use strict';

const DBField = use('db/src/DBField');

module.exports = class DBTable {

  constructor(name) {
    this._property = {};
    this._fields = {};
    this._changed = true;

    this.name(name);
  }

  name(name) {
    if (name === undefined) return this._property.name;
    this._property.name = name;
    return this;
  }

  addField(name, type = null, increment = false, primary = false) {
    const field = new DBField(name, this)
      .type(type)
      .increment(increment)
      .primary(primary);

    this._fields[name] = field;
    this._changed = true;
    return field;
  }

  field(name = null) {
    if (name === null) {
      return this._fields;
    }
    return this._fields[name];
  }

  prop() {
    if (this._changed) {
      this._property.columns = [];
      const foreignKeys = [];

      for (const index in this._fields) {
        this._property.columns.push(this._fields[index].prop());

        const foreigns = this._fields[index].foreigns();

        if (foreigns.length) {
          for (const index in foreigns) {
            foreignKeys.push(foreigns[index]);
          }
        }
      }

      if (foreignKeys.length) {
        this._property.foreignKeys = foreignKeys;
      }
    }
    return this._property;
  }

}
