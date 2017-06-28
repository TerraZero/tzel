'use strict';

const Annotation = use('boot/Annotation');

module.exports = class Event extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

}