'use strict';

const Entity = use('entity/test/Entity');

/**
 * @Base('etype')
 */
module.exports = class EntityType {

  constructor(data) {
    this._type = data.get('key');
    this._fields = {};
  }

  init() {

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



  create() {
    return new Entity(this);
  }

}
