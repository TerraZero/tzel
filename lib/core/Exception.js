'use strict';

/**
 * @Exception('exception')
 *
 * @Base('exception')
 */
module.exports = class Exception {

  constructor(data) {
    this._key = data.get('key');
    this._message = null;
    this._args = [];
  }

  init() { }

  key() {
    return this._key;
  }

  name() {
    return this.constructor.name;
  }

  message() {
    if (this._message === null) {
      return this.name() + '[' + this.key() + ']';
    }
    return this._message;
  }

  args() {
    return this._args;
  }

  setMessage(message = null) {
    this._message = message;
    return this;
  }

  setArgs(...args) {
    this._args = args;
    return this;
  }

  toMessage() {
    return this.replacing(this.message(), this.args());
  }

  toError() {
    const error = new Error(this.toMessage());
    error.__exception = this;
    return error;
  }

  placeholders() {
    return {};
  }

  /**
   * @param {string} message with placeholders
   * @param {string[]} args
   * @returns {string}
   */
  replacing(message, args) {
    const placeholders = this.placeholders();

    for (const index in args) {
      message = message.replace('\[' + index + '\]', '"' + args[index] + '"');
    }

    for (const index in placeholders) {
      message = message.replace('\[' + index + '\]', '"' + placeholders[index].call(this) + '"');
    }

    return message;
  }

}
