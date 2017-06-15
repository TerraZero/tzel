'use strict';

const FieldItems = use('entity/test/FieldItems');

module.exports = class Field {

  constructor(name, type, settings) {
    this._name = name;
    this._type = type;
    this._settings = settings;
    this._count = 1;
  }

  name() {
    return this._name;
  }

  type() {
    return this.definition().type(this);
  }

  settings() {
    return this._settings;
  }

  setting(name, fallback = null) {
    if (this._settings[name] === undefined) return fallback;
    return this._settings[name];
  }

  count() {
    return this._count;
  }

  setCount(number) {
    this._count = number;
    return this;
  }

  definition() {
    return this._type;
  }

  empty() {
    return this.definition().empty(this);
  }

  isEmpty(item, delta = 0) {
    return this.definition().isEmpty(this, item, delta);
  }

  getProperty(item, name = null) {
    return this.definition().getProperty(this, item, name);
  }

  getValue(item) {
    return this.definition().getValue(this, item);
  }

  setValue(item, value) {
    return this.definition().setValue(this, item, value);
  }

  create(value) {
    return this.definition().create(this, value);
  }

  validate(validator, item, values) {
    return this.definition().validate(this, validator, item, values);
  }

}
