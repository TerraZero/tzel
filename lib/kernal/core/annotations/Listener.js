'use strict';

const Annotation = use('core/Annotation');

module.exports = class Listener extends Annotation.class {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: null,
      weight: 0,
    };
  }

}
