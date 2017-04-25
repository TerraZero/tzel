'use strict';

const Annotation = require('./../../Annotation');

module.exports = class Handler extends Annotation {

  static get targets() { return [this.DEFINITION] }

  definition() {
    return {
      value: null,
    };
  }

}
