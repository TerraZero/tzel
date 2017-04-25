'use strict';

const Inject = use('service/annotations/Inject');
const Data = use('core/Data');

module.exports = class Injector {

  /**
   * @param {Parser} parser
   * @param {Data} data
   * @param {string} name
   */
  static scan(parser, data, name = 'injects') {
    const injects = parser.getDefinitions(Inject);

    for (const index in injects) {
      data.add(name, injects[index].value);
    }
  }

  /**
   * @param {object} subject
   * @param {Data} data
   * @param {string} name
   */
  static injecting(subject, data, name = 'injects') {
    const defintion = data.get(name);
    const injects = [];

    for (const index in defintion) {
      injects.push(use('service::' + defintion[index]));
    }
    if (typeof subject.inject === 'function' && injects.length) {
      subject.inject.apply(subject, injects);
    }
  }

  static directInject(subject, filename) {
    const Parser = boot.annotationParser();
    const parser = new Parser(filename);
    const data = new Data();

    this.scan(parser, data);
    this.injecting(subject, data);
  }

}
