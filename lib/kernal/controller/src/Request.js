'use strict';

module.exports = class Request {

  constructor(path, match, route) {
    this._path = path;
    this._match = match;
    this._route = route;

    this._controller = null;
  }

  path() {
    return this._path;
  }

  match() {
    return this._match;
  }

  route() {
    return this._route;
  }

  getController() {
    if (this._controller === null) {
      this._controller = use('controller::' + this.route().controller().get('key'));
    }
    return this._controller;
  }

  execute() {
    const controller = this.getController();

    controller[this.route().target()].apply(controller, [this]);
  }

  get(name, fallback = null) {
    return this.match()[name] || fallback;
  }

}
