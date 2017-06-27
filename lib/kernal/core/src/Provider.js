'use strict';

/**
 * @interface
 */
module.exports = class Provider {

  constructor(annotation) {
    this._annotation = annotation;
  }

  annotation() {
    return this._annotation;
  }

  weight() {
    return this.annotation().weight;
  }

  provider() {
    return this.annotation().value;
  }

  scan(parser, data) { }

  provide(subject, data, object) {
    return subject;
  }

  create(subject, data, args) {
    return Reflect.construct(subject, args, subject);
  }

}
