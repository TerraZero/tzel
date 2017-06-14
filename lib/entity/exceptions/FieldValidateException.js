'use strict';

const Exception = use('core/Exception');

/**
 * @Exception('field.validate')
 */
module.exports = class FieldValidateException extends Exception {

  init() {
    super.init();
    this.setMessage('The field [field] has an exception.');

    this._field = null;
  }

  setField(field) {
    this._field = field;
    return this;
  }

  field() {
    return this._field;
  }

  placeholders() {
    return {
      field: this.getFieldName,
    };
  }

  getFieldName() {
    return this.field().inspect();
  }

}
