'use strict';

const Provider = use('core/Provider');
const Service = use('service/annotations/Service');
const Inject = use('service/annotations/Inject');

/**
 * @Provider('service')
 */
module.exports = class ServiceProvider extends Provider {

  getParsers(mod) {
    return mod.get(Service);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    const service = parser.getDefinitions(Service, 0);
    const injects = parser.getDefinitions(Inject);

    data.set('key', service.value);
    for (const index in injects) {
      data.add('injects', injects[index].value);
    }
  }

  invoke(string, data) {
    const subject = new (require(data.get('file')))();
    const defintion = data.get('injects');
    const injects = [];

    // Make recusion possible
    this._cache[string] = subject;

    for (const index in defintion) {
      injects.push(use('service:' + defintion[index]));
    }

    if (typeof subject.inject === 'function') {
      subject.inject.apply(subject, injects);
    }
    return subject;
  }

}
