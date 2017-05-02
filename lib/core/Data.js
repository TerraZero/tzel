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
    if (this.isset(name)) {
      return this._data[name];
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
    this.doCheck(value);
    let collection = this.all();

    for (let index = 0; index < splits.length - 1; index++) {
      if (collection[splits[index]] === undefined) {
        collection[splits[index]] = {};
      }
      collection = collection[splits[index]];
    }
    collection[splits[splits.length - 1]] = value;
  }

  doCheck(value) {
    if (!this.check(value)) {
      throw new Error('value is not in correkt datatype');
    }
  }

  check(value) {
    if (this.accept(value)) {
      if (value instanceof Data) {
        value = value.all();
      }

      if (Array.isArray(value) || value && value.constructor === Object) {
        for (const field in value) {
          if (!this.check(value[field])) return false;
        }
      }
      return true;
    }
    return false;
  }

  isEmptyValue(value) {
    if (value === undefined) return true;
    return false;
  }

  accept(value) {
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        return true;
    }

    if (value === null) return true;
    if (Array.isArray(value)) return true;
    if (value && value.constructor === Object) return true;
    if (value instanceof Data) return true;

    return false;
  }

}
