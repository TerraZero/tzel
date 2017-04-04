'use strict';

const Annotation = use('core/Annotation');

module.exports = class Route extends Annotation {

  static get targets() { return [this.METHOD] }

  definition() {
    return {
      value: null,
      pattern: null,
      func: null,
    };
  }

};