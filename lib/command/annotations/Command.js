'use strict';

const Annotation = use('core/Annotation');

module.exports = class Command extends Annotation {

  static get noGroup() { return '-' }

  static get targets() { return [this.DEFINITION] }

  constructor(data, filePath) {
    super(data, filePath);
    this.value = this.initValue();
    this.group = this.group || this.getGroup();
  }

  fields() {
    return {
      value: null,
      group: null,
    };
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
      this._group = Command.noGroup;
    }
    return this._group;
  }

};
