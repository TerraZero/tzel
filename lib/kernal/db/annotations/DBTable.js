'use strict';

const Annotation = use('core/Annotation');

module.exports = class DBTable extends Annotation {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: ['default'],
      table: '::function',
    };
  }

};
