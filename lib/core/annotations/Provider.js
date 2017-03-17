'use strict';

const Annotation = require('./../Annotation');

module.exports = class Provider extends Annotation {

  definition() {
    return {
      value: null,
    };
  }

}
