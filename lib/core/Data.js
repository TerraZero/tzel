'use strict';

module.exports = class Data {

  constructor(data = {}) {
    this._data = data;
  }

  clear() {
    this._data = {};
  }

  isset(name) {
    return this._data[name] !== undefined;
  }

  unset(name) {
    delete this._data[name];
  }

  all() {
    return this._data;
  }

  get(name, fallback = null) {
    if (this.isset(name)) {
      return this._data[name];
    } else {
      return fallback;
    }
  }

  set(name, value) {
    this._data[name] = value;
  }

  add(name, value) {
    if (!this.isset(name)) {
      this.set(name, [value]);
    } else {
      this.get(name).push(value);
    }
  }

}
