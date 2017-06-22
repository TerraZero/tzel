'use strict';

const Annotation = use('core/Annotation');

module.exports = class Tags extends Annotation {

  static get targets() { return [this.DEFINITION] }

  constructor(data, filePath) {
    super(data, filePath);
    this.value = this.initValue();
  }

  fields() {
    return {
      value: null,
    };
  }

  initValue() {
    const names = this.value;

    if (Array.isArray(names)) {
      return names;
    }
    return [names];
  }

};
