'use strict';

const Annotation = use('core/Annotation');

module.exports = class Command extends Annotation {

  static get targets() { return [this.DEFINITION] }

  fields() {
    return {
      value: null,
      group: null,
      type: null,
    };
  }

  constructor(data, filePath) {
    super(data, filePath);
    this.value = this.initValue();
    this.group = this.group || this.getGroup();
  }

  initValue() {
    const names = this.value;

    if (Array.isArray(names)) {
      return names;
    }
    return [names];
  }

  getGroup() {
    if (this._group !== undefined) return this._group;
    const parts = this.value[0].split(':');
    if (parts.length > 1) {
      this._group = parts[0];
    } else {
      this._group = '-';
    }
    return this._group;
  }

};
