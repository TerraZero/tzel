'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Controller = use('controller/annotations/Controller');
const RouteAnnotation = use('controller/annotations/Route');
const Route = use('controller/src/Route');
const Deliver = use('controller/services/Deliver');

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
    const routes = parser.getMethods(RouteAnnotation);

    data.set('key', controller.value);
    for (const index in routes) {
      Deliver.addRoute(new Route(controller, routes[index]));
    }
  }

  createSubject(string, data) {
    return new (require(data.get('file')))();
  }

}
