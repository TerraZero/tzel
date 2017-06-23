'use strict';

const Annotation = use('core/Annotation');

module.exports = class QueryBuilder extends Annotation {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: null,
      context: null,
    };
  }

};
