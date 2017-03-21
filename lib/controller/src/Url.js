'use strict';

const deliverer = use('service::deliverer');

module.exports = class Url {

  constructor(route, param) {
    this._route = deliverer.getRoute(route);
    this._param = param;
  }

  route() {
    return this._route;
  }

  param() {
    return this._param;
  }

  generate() {
    return this.route().matcher().stringify(this.param());
  }

}
