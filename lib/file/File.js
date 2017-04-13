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

  data() {
    return this._path;
  }

  uri() {
    return this._manager.resolve(this._path);
  }

  path() {
    return this._manager.format(this._path);
  }

  /**
   * Overwrite cli output
   */
  inspect() {
    return this.constructor.name + '["' + this.uri() + '"]';
  }

}
