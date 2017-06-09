'use strict';

const Annotation = use('core/Annotation');

module.exports = class EntityFieldType extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

};
