'use strict';

module.exports = class Checker {

  check(value) {
    if (this.accept(value)) {
      if (value instanceof Data) {
        value = value.all();
      }

      if (Array.isArray(value) || value && value.constructor === Object) {
        for (const field in value) {
          if (!this.check(value[field])) return false;
        }
      }
      return true;
    }
    return false;
  }

  isEmptyValue(value) {
    if (value === undefined) return true;
    return false;
  }

  accept(value) {
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        return true;
    }

    if (value === null) return true;
    if (Array.isArray(value)) return true;
    if (value && value.constructor === Object) return true;
    if (value instanceof Data) return true;

    return false;
  }

}
