'use strict';

const Annotation = use('boot/Annotation');

module.exports = class QueryBuilder extends Annotation.class {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: null,
      context: null,
    };
  }

};
