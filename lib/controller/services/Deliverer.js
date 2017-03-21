'use strict';

const Request = use('controller/src/Request');

/**
 * @Service('deliverer')
 */
module.exports = class Deliverer {

  static struct() {
    this._routes = {};
  }

  static addRoute(route) {
    this._routes[route.key()] = route;
  }

  getRequest(path) {
    for (const index in this.constructor._routes) {
      const match = this.constructor._routes[index].matcher().match(path);

      if (match !== null) return new Request(path, match, this.constructor._routes[index]);
    }
    return null;
  }

}
