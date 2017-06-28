'use strict';

const Annotation = use('boot/Annotation');

module.exports = class Service extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
      description: null,
      type: null,
    };
  }

  constructor(data, filePath) {
    super(data, filePath);

    if (this.type === null || this.type === undefined) {
      const parts = this.value.split('.');
      if (parts.length > 1) {
        this.type = parts[0];
      }
    }
  }

};
