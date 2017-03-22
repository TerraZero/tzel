'use strict';

module.exports = class Template {

  constructor(data) {
    this._key = data.get('key');
    this._file = data.get('file');

    this._template = null;
  }

  key() {
    return this._key;
  }

  file() {
    return this._file;
  }

  template() {
    if (!this._template) {
      this._template = require(this.file());
    }
    return this._template;
  }

  generate(values = {}) {
    return this.template()(values);
  }

}
