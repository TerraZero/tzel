'use strict';

const Field = use('db/src/DBField');

module.exports = class DBTable {

  constructor(name) {
    this._property = {};
    this._fields = {};
    this._changed = true;

    this.name(name);
  }

  name(name) {
    this._property.name = name;
    return this;
  }

  field(name) {
    const field = new Field(name);

    this._fields[name] = field;
    this._changed = true;
    return field;
  }

  prop() {
    if (this._changed) {
      this._property.columns = [];
      for (const index in this._fields) {
        this._property.columns.push(this._fields[index].prop());
      }
    }
    return this._property;
  }

}
