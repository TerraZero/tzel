'use strict';

/**
 * @Exception('exception')
 */
module.exports = class Exception {

  constructor(data) {
    this._key = data.key;
    this._message = null;
    this._args = [];
    this._placeholders = this.placeholders();
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

  toMessage(type = 'default') {
    return this.replacing(this.message(), this.args(), type);
  }

  toError(type = 'default') {
    const error = new Error(this.toMessage(type));
    error.__exception = this;
    return error;
  }

  throw(type = 'default') {
    throw this.toError(type);
  }

  placeholders() {
    return {};
  }

  getPlaceholderValue(name, type = 'default') {
    return this._placeholders[name].call(this, type);
  }

  /**
   * @param {string} message with placeholders
   * @param {string[]} args
   * @returns {string}
   */
  replacing(message, args, type = 'default') {
    for (const index in args) {
      message = message.replace(new RegExp('\\\[' + index + '\\\]', 'g'), '"' + args[index] + '"');
    }

    for (const index in this._placeholders) {
      message = message.replace(new RegExp('\\\[' + index + '\\\]', 'g'), '"' + this.getPlaceholderValue(index, type) + '"');
    }

    return message;
  }

}
