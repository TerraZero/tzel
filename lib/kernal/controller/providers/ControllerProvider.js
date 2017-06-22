'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Controller = use('controller/annotations/Controller');
const Route = use('controller/annotations/Route');

/**
 * @Provider('controller')
 */
module.exports = class ControllerProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(Controller);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const controller = parser.getDefinitions(Controller, 0);
    const routes = parser.getMethods(Route);

    data.set('key', controller.value);
    for (const index in routes) {
      data.add('routes', routes[index].getData());
    }
  }

  createSubject(string, data) {
    return new (require(data.get('file')))();
  }

}
