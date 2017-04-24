'use strict';

module.exports = class TagContainer {

  constructor(tag, classes) {
    this._tag = tag;
    this._classes = classes;

    this._constructed = false;
  }

  tag() {
    return this._tag;
  }

  classes() {
    return this._classes;
  }

  isConstructed() {
    return this._constructed;
  }

  construct(func = null) {
    if (this._constructed) return this;
    this._constructed = true;

    if (typeof func === 'function') {
      for (const index in this._classes) {
        this._classes[index].subject = func(this._classes[index].subject, this._classes[index].reader);
      }
    } else {
      for (const index in this._classes) {
        this._classes[index].subject = new (this._classes[index].subject)();
      }
    }
    return this;
  }

  call(...args) {

  }

  each(func = null) {

  }

}
