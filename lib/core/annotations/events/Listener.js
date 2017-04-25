'use strict';

const Annotation = require('./../../Annotation');

module.exports = class Listener extends Annotation {

  static get targets() { return [this.METHOD] }

  definition() {
    return {
      value: null,
    };
  }

}
