'use strict';

const Request = use('controller/src/Request');

/**
 * @Service('deliver')
 */
module.exports = class DeliverService {

  static struct() {
    this._routes = this._routes || {};
  }

  static addRoute(route) {
    this._routes[route.key()] = route;
  }

  static routes() {
    return this._routes;
  }

  routes() {
    return this.constructor.routes();
  }

  getRoute(key) {
    return this.routes()[key] || null;
  }

  getRequest(path) {
    const routes = this.constructor.routes();

    for (const index in routes) {
      const match = routes[index].matcher().match(path);

      if (match !== null) return new Request(path, match, routes[index]);
    }
    return null;
  }

}
