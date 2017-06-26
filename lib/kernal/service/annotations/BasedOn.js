'use strict';

const Annotation = use('core/Annotation');

module.exports = class BasedOn extends Annotation.class {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

}
