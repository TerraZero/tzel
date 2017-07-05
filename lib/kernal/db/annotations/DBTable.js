'use strict';

const Annotation = use('boot/Annotation');

module.exports = class DBTable extends Annotation.class {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: ['default'],
      table: '::function',
    };
  }

};
