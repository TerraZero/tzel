'use strict';

const deliver = use('service::deliver');

module.exports = class Url {

  constructor(route, param = {}) {
    this._route = deliver.getRoute(route);
    this._param = param;
  }

  route() {
    return this._route;
  }

  param() {
    return this._param;
  }

  setParam(key, value) {
    this._param[key] = value;
  }

  generate() {
    return this.route().matcher().stringify(this.param());
  }

}
