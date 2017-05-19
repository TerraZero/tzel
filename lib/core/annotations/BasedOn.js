'use strict';

const Annotation = require('./../Annotation');

module.exports = class BasedOn extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

}
