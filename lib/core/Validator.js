'use strict';

const validate = Symbol('validate');

const Exception = use('proxy::exception');

module.exports = class Validator {

  static get validate() {
    return validate;
  }

  static valid(subject, ...args) {
    return new Validator(subject, args).valid(subject);
  }

  constructor(subject, args = []) {
    this._subject = subject;
    this._args = args;
    this._exceptions = [];
  }

  subject() {
    return this._subject;
  }

  args() {
    return this._args;
  }

  exceptions() {
    return this._exceptions;
  }

  add(exception) {
    const e = new Exception(exception);

    this.addException(e);
    return e;
  }

  addException(exception) {
    this._exceptions.push(exception);
    return this;
  }

  valid(subject) {
    if (typeof subject[validate] === 'function') {
      subject[validate].call(subject, this);
    }
    return this;
  }

  isError() {
    return this.exceptions().length;
  }

  toError() {
    const exceptions = this.exceptions();
    const message = ['Validator for "' + this.subject() + '" with ' + exceptions.length + ' errors.'];

    for (const index in exceptions) {
      message.push('\t[' + (Number(index) + 1) + '] ' + exceptions[index].toMessage());
    }
    return new Error(message.join('\n'));
  }

  throw() {
    if (this.isError()) {
      throw this.toError();
    }
  }

  *[Symbol.iterator]() {
    for (const value of this.exceptions()) {
      yield value;
    }
  }

}
