'use strict';

const Validator = use('core/Validator');
const FieldItem = use('entity/test/FieldItem');

module.exports = class FieldItems {

  constructor(entity, field) {
    this._entity = entity;
    this._field = field;
  }

  entity() {
    return this._entity;
  }

  field() {
    return this._field;
  }

  prop(value, set) {
    return this.entity().prop(value, this.field(), set);
  }

  empty() {
    return this.prop('type').isEmpty(this);
  }

  get(delta = 0) {
    return new FieldItem(this.entity(), this.field(), delta);
  }

  value(delta = 0) {
    return this.get(delta).value();
  }

  clear() {
    this.prop('value', []);
    return this;
  }

  set(values) {
    this.clear();

    if (Array.isArray(values)) {
      for (const value of values) {
        this.add(value);
      }
    } else {
      this.add(values);
    }
    return this;
  }

  add(value) {
    value = this.prop('type').create(value);
    this.prop('value').push(value);
    return this;
  }

  all() {
    const values = [];

    for (let i = 0; i < this.length(); i++) {
      values.push(this.get(i));
    }
    return values;
  }

  length() {
    return this.prop('value').length;
  }

  inspect() {
    return 'Items[' + this.entity().getEntityType() + '#' + this.entity().id() + '.' + this.field() + ':' + this.length() + ']';
  }

  validate() {

  }

  *[Symbol.iterator]() {
    let delta = 0;

    while (delta < this.length()) {
      yield this.get(delta++);
    }
  }

  [Validator.validate](validator) {
    validator.add('field.validate').setField(this);
  }

}
