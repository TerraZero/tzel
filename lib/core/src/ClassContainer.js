'use strict';

module.exports = class ClassContainer {

  constructor(classes = {}) {
    this._classes = classes;
  }

  getClasses() {
    return this._classes;
  }

  setClasses(classes = {}) {
    this._classes = classes;
    return this;
  }

  set(name, subject) {
    this._classes[name] = subject;
    return this;
  }

  remove(name) {
    delete this._classes[name];
    return this;
  }

  get(name) {
    return this._classes[name];
  }

  has(name) {
    return this._classes[name] !== undefined;
  }

  setClasses(classes = {}) {
    for (const index in classes) {
      this.set(index, classes[index]);
    }
    return this;
  }

  each(func) {
    for (const index in this._classes) {
      func(this, index, this._classes[index]);
    }
    return this;
  }

  call(name, context = null, ...args) {
    return this.apply(name, context, args);
  }

  apply(name, context = null, args = []) {
    for (const index in this._classes) {
      this._classes[index][name].apply(context, args);
    }
    return this;
  }

}
