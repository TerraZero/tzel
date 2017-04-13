'use strict';

const Injector = use('service/Injector');

/**
 * @Inject('manager.file')
 */
module.exports = class File {

  constructor(...parts) {
    Injector.directInject(this, __filename);
    this._path = this._manager.normalize(parts);
  }

  inject(manager) {
    this._manager = manager;
  }

  copy(target) {

  }

  move(target) {

  }

  delete() {

  }

  content() {

  }

  exist() {

  }

  uri() {
    return this._path;
  }

  path() {
    return this._manager.resolve(this._path);
  }

}
