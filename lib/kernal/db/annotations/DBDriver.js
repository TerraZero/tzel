'use strict';

const Annotation = use('core/Annotation');

module.exports = class DBDriver extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
    };
  }

};
