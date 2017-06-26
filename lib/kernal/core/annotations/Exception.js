'use strict';

const Annotation = use('core/Annotation');

module.exports = class Exception extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

};
