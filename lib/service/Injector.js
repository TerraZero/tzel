'use strict';

const Inject = use('service/annotations/Inject');

module.exports = class Injector {

  /**
   * @param {Parser} parser
   * @param {Data} data
   */
  static scan(parser, data) {
    const injects = parser.getDefinitions(Inject);

    for (const index in injects) {
      data.add('injects', injects[index].value);
    }
  }

  /**
   * @param {object} subject
   * @param {Data} data
   */
  static injecting(subject, data) {
    const defintion = data.get('injects');
    const injects = [];

    for (const index in defintion) {
      injects.push(use('service::' + defintion[index]));
    }
    if (typeof subject.inject === 'function' && injects.length) {
      subject.inject.apply(subject, injects);
    }
  }

}
