'use strict';

const RouteMatcher = require('url-pattern');

/**
 * @Base('factory.route')
 */
module.exports = class RouteFactoryBase {

  newRoute(pattern) {
    return new RouteMatcher(pattern, this.options());
  }

  options() {
    return {};
  }

}
