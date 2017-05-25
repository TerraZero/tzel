'use strict';

const Request = use('controller/src/Request');
const Route = use('controller/src/Route');

/**
 * @Service('deliver')
 *
 * @Inject('helper.boot')
 */
module.exports = class DeliverService {

  constructor() {
    this._routes = null;
  }

  inject(boot) {
    this._boot = boot;
  }

  routes() {
    if (this._routes === null) {
      this._routes = [];
      const datas = this._boot.provider('controller').getData();

      for (const index in datas) {
        const routes = datas[index].get('routes');

        for (const i in routes) {
          this._routes.push(new Route(datas[index], routes[i]));
        }
      }
    }
    return this._routes;
  }

  getRoute(key) {
    return this.routes()[key] || null;
  }

  getRequest(path) {
    const routes = this.routes();

    for (const index in routes) {
      const match = routes[index].matcher().match(path);

      if (match !== null) return new Request(path, match, routes[index]);
    }
    return null;
  }

}
