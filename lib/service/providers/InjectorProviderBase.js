'use strict';

const Provider = use('core/Provider');
const Injector = use('service/Injector');

module.exports = class InjectorProviderBase extends Provider {

  prepare(data, parser) {
    Injector.scan(parser, data);
  }

  invoke(string, data) {
    const subject = this.createSubject(string, data);

    // Make recusion possible
    this._cache[string] = subject;
    Injector.injecting(subject, data);
    return subject;
  }

  /**
   * @abstract
   * @param {string} string
   * @param {Data} data
   * @returns {object}
   */
  createSubject(string, data) { }

}
