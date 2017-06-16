'use strict';

const Validator = use('core/Validator');
const FieldItem = use('entity/src/FieldItem');

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

  isEmpty() {
    return this.prop('field').isEmpty(this);
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

  set(value, index = null) {
    if (index === null) {
      this.clear();
      if (Array.isArray(value)) {
        for (const v of value) {
          this.add(v);
        }
      } else {
        this.add(value);
      }
    } else {
      if (this.length() > index) {
        this.get(index).set(value);
      }
    }
    return this;
  }

  add(value) {
    value = this.prop('field').create(value);
    this.prop('value').push(value);
    return this;
  }

  items() {
    const values = [];

    for (let i = 0; i < this.length(); i++) {
      values.push(this.get(i));
    }
    return values;
  }

  values() {
    const values = [];

    for (let i = 0; i < this.length(); i++) {
      values.push(this.value(i));
    }
    return values;
  }

  length() {
    return this.prop('value').length;
  }

  inspect() {
    return 'Items[' + this.entity().getEntityType() + '#' + this.entity().id() + '.' + this.field() + ':' + this.length() + ']';
  }

  *[Symbol.iterator]() {
    let delta = 0;

    while (delta < this.length()) {
      yield this.get(delta++);
    }
  }

  [Validator.func](validator) {
    for (const item of this) {
      if (validator.validate(item).isBreak()) break;
    }
  }

}
