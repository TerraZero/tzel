'use strict';

const FieldType = use('entity/test/FieldType');
const FieldItems = use('entity/test/FieldItems');

module.exports = class Entity {

  constructor(id = 0) {
    this._infos = {
      id: {
        type: new FieldType('int'),
        values: [],
        item: null,
      },
      name: {
        type: new FieldType('string'),
        values: [],
        item: null,
      },
      node: {
        type: new FieldType('entity'),
        values: [],
        item: null,
      },
    };

    this.get('id').add(id);
    this.get('name').add('hallo');
  }

  get(field) {
    if (this._infos[field].item === null) {
      this._infos[field].item = new FieldItems(this, field);
    }
    return this._infos[field].item;
  }

  hasField(field) {
    return this._infos[field] !== undefined;
  }

  getProperty(field) {
    return this._infos[field];
  }

  inspect() {
    return this.constructor.name + '[' + this.get('id').value() + ']';
  }

}
