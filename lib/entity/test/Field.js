'use strict';

const FieldItems = use('entity/test/FieldItems');

module.exports = class Field {

  constructor(name, type, settings) {
    this._name = name;
    this._type = type;
    this._settings = settings;
  }

  name() {
    return this._name;
  }

  type() {
    return this.definition().type();
  }

  settings() {
    return this._settings;
  }

  definition() {
    return this._type;
  }

  empty() {
    return this.definition().empty();
  }

  isEmpty(item, delta = 0) {
    return this.definition().isEmpty(item, delta);
  }

  getProperty(item, name = null) {
    return this.definition().getProperty(item, name);
  }

  getValue(item) {
    return this.definition().getValue(item);
  }

  setValue(item, value) {
    return this.definition().setValue(item, value);
  }

  create(value) {
    return this.definition().create(value);
  }

}
