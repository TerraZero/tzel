'use strict';

const Annotation = use('core/Annotation');

module.exports = class Event extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

}
