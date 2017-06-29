'use strict';

const Annotation = use('boot/Annotation');

module.exports = class Event extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  constructor(data, filePath) {
    super(data, filePath);
    this.pattern = this.pattern || this.value;
  }

  fields() {
    return {
      value: null,
      pattern: null,
    };
  }

}
