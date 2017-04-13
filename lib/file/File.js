'use strict';

const Injector = use('service/Injector');

/**
 * @Inject('manager.storage')
 */
module.exports = class File {

  constructor(...parts) {
    Injector.directInject(this, __filename);
    this._path = this._storage.normalize(parts);
  }

  inject(storage) {
    this._storage = storage;
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
    return this._storage.resolve(this._path);
  }

}
