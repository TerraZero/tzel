'use strict';

/**
 * @interface
 */
module.exports = class Provider {

  /**
   * The protocol name for this Provider
   * @return {string}
   */
  protocol() { }

  /**
   * @abstract
   * @param {Data} data
   * @param {string} path
   * @param {Parser} parser
   * @returns {boolean}
   */
  accept(data, path, parser) {
    return false;
  }

  /**
   * @abstract
   * @param {Data} data
   * @param {string} path
   * @param {Parser} parser
   */
  prepare(data, path, parser) { }

  /**
   * @abstract
   * @param {srting} string
   * @param {Data} data
   * @returns {object}
   */
  invoke(string, data) { }

  /**
   * @abstract
   * @param {Data} data
   * @param {string} path
   * @param {Parser} parser
   */
  prepareAlter(data, path, parser) { }

  /**
   * @abstract
   * @param {Data} data
   * @param {object} subject
   */
  invokeAlter(data, subject) { }

}
