'use strict';

const RouteFactoryBase = use('routes/src/RouteFactoryBase');

/**
 * @Service('factory.route.event')
 *
 * @Tags('factory.route')
 */
module.exports = class EventRouteFactory extends RouteFactoryBase {

  options() {
    return {};
  }

}
