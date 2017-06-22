'use strict';

const Annotation = use('core/Annotation');

module.exports = class Exception extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

};
