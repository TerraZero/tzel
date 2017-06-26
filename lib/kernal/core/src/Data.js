'use strict';

module.exports = class Data {

  constructor(data = {}) {
    this._data = data;
  }

  clear() {
    this._data = {};
    return this;
  }

  isset(name) {
    return this.doIsset(this.splitName(name));
  }

  unset(name) {
    delete this._data[name];
    return this;
  }

  all() {
    return this._data;
  }

  get(name, fallback = null) {
    const splits = this.splitName(name);

    if (this.isset(splits)) {
      return this.doGet(splits);
    } else {
      return fallback;
    }
  }

  set(name, value) {
    this.doSet(this.splitName(name), value);
    return this;
  }

  add(name, value) {
    if (!this.isset(name)) {
      this.set(name, [value]);
    } else {
      this.get(name).push(value);
    }
    return this;
  }

  splitName(name) {
    if (Array.isArray(name)) return name;
    return name.split('.');
  }

  doIsset(splits) {
    let collection = this.all();

    for (const index in splits) {
      if (collection[splits[index]] === undefined) return false;
      collection = collection[splits[index]];
    }
    return true;
  }

  doGet(splits) {
    let collection = this.all();

    for (const index in splits) {
      if (collection[splits[index]] === undefined) return null;
      collection = collection[splits[index]];
    }
    return collection;
  }

  doSet(splits, value) {
    let collection = this.all();

    for (let index = 0; index < splits.length - 1; index++) {
      if (collection[splits[index]] === undefined) {
        collection[splits[index]] = {};
      }
      collection = collection[splits[index]];
    }
    collection[splits[splits.length - 1]] = value;
  }

}
