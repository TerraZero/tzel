'use strict';

module.exports = class TagContainer {

  constructor(tag) {
    this._tag = tag;
  }

  tag() {
    return this._tag;
  }

}
