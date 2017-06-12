'use strict';

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

  next() {
    return new FieldItem(this.entity(), this.field(), this.delta() + 1);
  }

  inspect() {
    return 'Item[' + this.entity().getEntityType() + '.' + this.field() + '->' + this.delta() + ' = ' + JSON.stringify(this.data()) + ']';
  }

}
