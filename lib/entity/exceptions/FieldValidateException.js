'use strict';

const Exception = use('core/Exception');

/**
 * @Exception('field.validate')
 */
module.exports = class FieldValidateException extends Exception {

  init() {
    super.init();
    this.setType(0);

    this._item = null;
  }

  setItem(item) {
    this._item = item;
    return this;
  }

  setType(type) {
    this.setMessage(this.types()[type]);
    return this;
  }

  types() {
    return [
      'The field [field] has an unexpected exception',
      'The field [field] has to many values! Givin [length], allowed [count]',
    ];
  }

  item() {
    return this._item;
  }

  placeholders() {
    return {
      field: this.getFieldName,
      length: this.getFieldLength,
      count: this.getFieldCount,
    };
  }

  getFieldName() {
    return this.item().inspect();
  }

  getFieldLength() {
    return this.item().length();
  }

  getFieldCount() {
    return this.item().prop('type').count();
  }

}
