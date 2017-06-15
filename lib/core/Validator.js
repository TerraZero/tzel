'use strict';

const validate = Symbol('validate');

const Exception = use('proxy::exception');

module.exports = class Validator {

  static get func() {
    return validate;
  }

  static validate(subject, ...args) {
    const v = new Validator(subject, args);

    v.validate(subject);
    return v;
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

  validate(subject) {
    this.break(false);
    if (typeof subject[validate] === 'function') {
      subject[validate].call(subject, this);
    }
    return this;
  }

  break(b = true) {
    this._break = b;
    return this;
  }

  isBreak(reset = true) {
    const value = this._break;

    if (reset) {
      this._break = false;
    }
    return value;
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
    const e = new Error(message.join('\n'));

    e.__validator = this;
    return e;
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
