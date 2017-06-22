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
      'The field [field] has an invalid value [0]. The property [1] from field [field] must be from type [2].',
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

  getFieldName(type = 'default') {
    if (type === 'user') {
      return this.item().field();
    }
    return this.item().inspect();
  }

  getFieldLength() {
    return this.item().length();
  }

  getFieldCount() {
    return this.item().prop('field').count();
  }

}
