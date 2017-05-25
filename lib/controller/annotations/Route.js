'use strict';

const Annotation = use('core/Annotation');

module.exports = class Route extends Annotation {

  static get targets() { return [this.METHOD] }

  fields() {
    return {
      value: null,
      pattern: null,
      func: null,
    };
  }

  getFunc() {
    return this.func || this.target;
  }

  getData() {
    const data = super.getData();

    data.func = this.getFunc();
    return data;
  }

};
