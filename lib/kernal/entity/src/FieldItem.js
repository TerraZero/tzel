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
    return this.prop('field').get(this);
  }

  get(property = null) {
    if (property === null) {
      return this.prop('value')[this.delta()];
    } else {
      return this.prop('value')[this.delta()][property];
    }
  }

  set(value) {
    value = this.prop('field').create(value);
    this.prop('value')[this.delta()] = value;
    return this;
  }

  isEmpty() {
    return this.prop('field').isEmpty(this, this.delta());
  }

  length() {
    return this.prop('value').length;
  }

  inspect() {
    return 'Item[' + this.entity().getEntityType() + '#' + this.entity().id() + '.' + this.field() + '->' + this.delta() + ' = ' + JSON.stringify(this.get()) + ']';
  }

  [Validator.func](validator) {
    this.prop('field').validate(validator, this, this.get());
  }

}
