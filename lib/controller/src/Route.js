'use strict';

const Matcher = require('url-pattern');
const matcherOptions = {
  segmentNameStartChar: '$',
};

module.exports = class Route {

  constructor(controller, route) {
    this._controller = controller;
    this._key = route.value;
    this._pattern = route.pattern;
    this._target = route.target;

    this._matcher = new Matcher(this.pattern(), matcherOptions);
  }

  controller() {
    return this._controller;
  }

  key() {
    return this._key;
  }

  pattern() {
    return this._pattern;
  }

  target() {
    return this._target;
  }

  matcher() {
    return this._matcher;
  }

}
