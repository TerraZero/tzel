'use strict';

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

  property() {
    return this.entity().getProperty(this.field());
  }

  prop(value) {
    return this.property()[value];
  }

  empty() {
    return this.prop('type').isEmpty(this);
  }

  get(delta = 0) {
    return new FieldItem(this.entity(), this.field(), delta);
  }

  value() {
    return this.get(0).value();
  }

  clear() {
    this.property().values = [];
    return this;
  }

  set(values) {
    this.clear();

    if (Array.isArray(values)) {
      for (const index in values) {
        this.add(values[index]);
      }
    } else {
      this.add(values);
    }
    return this;
  }

  add(value) {
    value = this.prop('type').create(value);
    this.prop('values').push(value);
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
    return this.prop('values').length;
  }

  inspect() {
    return 'Items[' + this.entity().constructor.name + '.' + this.field() + ':' + this.length() + ']';
  }

  *[Symbol.iterator]() {
    var delta = 0;

    while (delta < this.length()) {
      yield this.get(delta++);
    }
  }

}
