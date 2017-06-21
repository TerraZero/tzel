'use strict';

const FieldItems = use('entity/src/FieldItems');

module.exports = class Field {

  constructor(name, type, settings, entityType) {
    this._name = name;
    this._type = type;
    this._settings = {};
    this._count = 1;
    this._entityType = entityType;

    this.setSettings(settings);
  }

  name() {
    return this._name;
  }

  type() {
    return this.definition().type(this);
  }

  setSettings(settings) {

  }

  settings() {
    return this._settings;
  }

  setting(name, fallback = null) {
    if (this._settings[name] === undefined) return fallback;
    return this._settings[name];
  }

  entityType() {
    return this._entityType;
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

  isEmpty(item, delta = 0) {
    return this.definition().isEmpty(this, item, delta);
  }

  get(item) {
    return this.definition().get(this, item);
  }

  create(value) {
    return this.definition().create(this, value);
  }

  validate(validator, item, values) {
    return this.definition().validate(this, validator, item, values);
  }

}
