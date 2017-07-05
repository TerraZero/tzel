'use strict';

const Annotation = use('boot/Annotation');

module.exports = class FieldType extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

};
