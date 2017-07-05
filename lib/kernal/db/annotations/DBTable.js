'use strict';

const Annotation = use('boot/Annotation');

module.exports = class DBTable extends Annotation.class {

  static get targets() { return [this.METHOD] }

  static get funcname() { return '::function'; }

  fields() {
    return {
      value: ['default'],
      table: DBTable.funcname,
    };
  }

};
