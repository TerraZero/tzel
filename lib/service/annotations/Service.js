'use strict';

const Annotation = use('core/Annotation');

module.exports = class Service extends Annotation {

  static get targets() { return [this.DEFINITION] }

  definition() {
    return {
      value: null,
    };
  }

};
