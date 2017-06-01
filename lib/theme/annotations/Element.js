'use strict';

const Annotation = use('core/Annotation');

module.exports = class Element extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

};
