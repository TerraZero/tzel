'use strict';

const Annotation = use('core/Annotation');

module.exports = class Base extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  constructor(data, filePath) {
    super(data, filePath);
    this.for = this.for || this.getFor();
  }

  fields() {
    return {
      value: null,
      for: null,
      description: '',
      inject: null,
    };
  }

  getFor() {
    return this.value.split('.')[0];
  }

}
