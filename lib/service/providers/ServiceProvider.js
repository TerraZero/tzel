'use strict';

const Provider = use('core/Provider');
const Service = use('service/annotations/Service');
const Injector = use('service/Injector');

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

    data.set('key', service.value);
    Injector.scan(parser, data);
  }

  invoke(string, data) {
    const subject = new (require(data.get('file')))();

    // Make recusion possible
    this._cache[string] = subject;
    Injector.injecting(subject, data);
    return subject;
  }

}
