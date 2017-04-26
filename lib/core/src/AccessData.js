'use strict';

module.exports = class AccessData {

  constructor(data) {
    this._data = data;
  }

  getData() {
    return this._data;
  }

  get(name, fallback = null) {
    const splits = name.split('.');
    let value = this.getData();

    for (const index in splits) {
      if (value[splits[index]] === undefined) return fallback;
      value = value[splits[index]];
    }
    return value;
  }

}
