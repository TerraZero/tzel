'use strict';

const Annotation = use('core/Annotation');

module.exports = class EntityType extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
      storage: null,
    };
  }

};
