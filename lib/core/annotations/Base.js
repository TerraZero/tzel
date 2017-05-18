'use strict';

const Annotation = require('./../Annotation');

module.exports = class Base extends Annotation {

  static get targets() { return [this.DEFINITION] }

  constructor(data, filePath) {
    super(data, filePath);
    this.for = this.for || this.getFor();
  }

  fields() {
    return {
      value: null,
      for: [],
      description: '',
    };
  }

  getFor() {
    return this.value.split('.')[0];
  }

}
