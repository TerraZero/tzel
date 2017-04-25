'use strict';

const Annotation = require('./../Annotation');

module.exports = class Provider extends Annotation {

  static get targets() { return [this.DEFINITION] }

  definition() {
    return {
      value: null,
    };
  }

}
