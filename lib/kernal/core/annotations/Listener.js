'use strict';

const Annotation = use('boot/Annotation');

module.exports = class Listener extends Annotation.class {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: null,
      pattern: null,
      weight: 0,
    };
  }

}
