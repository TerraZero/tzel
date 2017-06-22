'use strict';

const Inject = use('service/annotations/Inject');
const BasedOn = use('service/annotations/BasedOn');
const Data = use('core/Data');

module.exports = class Injector {

  /**
   * @param {Parser} parser
   * @param {Data} data
   * @param {string} name
   */
  static scan(parser, data, name = 'injects') {
    this.scanInjects(parser, data, name);
    this.scanBasing(parser, data, name);
  }

  static scanInjects(parser, data, name = 'injects') {
    const injects = parser.getDefinitions(Inject);

    for (const index in injects) {
      data.add(name, injects[index].value);
    }
  }

  static scanBasing(parser, data, name = 'injects') {
    const basedon = parser.getDefinitions(BasedOn);

    if (basedon && basedon.length) {
      const base = use('base::' + basedon[0].value);
      data.set('basing', base.basing);
    }
  }

  /**
   * @param {object} subject
   * @param {Data} data
   * @param {string} name
   */
  static injecting(subject, data, name = 'injects', func = 'inject') {
    this.injectingArray(subject, data.get(name), func);
    const basing = data.get('basing');

    if (basing === null) return;

    for (const func in basing) {
      this.injectingArray(subject, basing[func], func);
    }
  }

  static injectingArray(subject, array, func = 'inject') {
    const injects = [];

    for (const index in array) {
      injects.push(use('service::' + array[index]));
    }
    if (typeof subject[func] === 'function' && injects.length) {
      subject[func].apply(subject, injects);
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
