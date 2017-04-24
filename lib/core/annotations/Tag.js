'use strict';

const Annotation = require('./../Annotation');

module.exports = class Tag extends Annotation {

  definition() {
    return {
      value: null,
    };
  }

}
