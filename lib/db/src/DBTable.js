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
    this._property.name = name;
    return this;
  }

  field(name) {
    const field = new DBField(name, this);

    this._fields[name] = field;
    this._changed = true;
    return field;
  }

  prop() {
    if (this._changed) {
      this._property.columns = [];
      const foreignKey = {
        table: null,
        columns: [],
        refColumns: [],
      };

      for (const index in this._fields) {
        this._property.columns.push(this._fields[index].prop());

        const foreign = this._fields[index].foreign();

        if (foreign !== null) {
          foreignKey.table = foreign.table;
          foreignKey.columns.push(this._fields[index].name());
          foreignKey.refColumns.push(foreign.column);
          if (foreign.trigger !== null) {
            foreignKey[foreign.trigger] = foreign.action;
          }
        }
      }
      if (foreignKey.table !== null) {
        this._property.foreignKeys = [foreignKey];
      }
    }
    return this._property;
  }

}
