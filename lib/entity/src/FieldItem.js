'use strict';

const Validator = use('core/Validator');

module.exports = class FieldItem {

  constructor(entity, field, delta = 0) {
    this._entity = entity;
    this._field = field;
    this._delta = delta;
  }

  entity() {
    return this._entity;
  }

  field() {
    return this._field;
  }

  delta() {
    return this._delta;
  }

  prop(value, set) {
    return this.entity().prop(value, this.field(), set);
  }

  value() {
    return this.prop('type').getValue(this);
  }

  data() {
    return this.prop('value')[this.delta()];
  }

  set(value) {
    value = this.prop('type').create(value);
    this.prop('type').setValue(this, value);
    return this;
  }

  empty() {
    return this.prop('type').isEmpty(this, this.delta());
  }

  length() {
    return this.prop('value').length;
  }

  next() {
    return new FieldItem(this.entity(), this.field(), this.delta() + 1);
  }

  inspect() {
    return 'Item[' + this.entity().getEntityType() + '#' + this.entity().id() + '.' + this.field() + '->' + this.delta() + ' = ' + JSON.stringify(this.data()) + ']';
  }

  [Validator.func](validator) {
    this.prop('type').validate(validator, this, this.prop('value')[this.delta()]);
  }

}
