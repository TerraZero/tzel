'use strict';

const Injector = use('service/Injector');

/**
 * @Inject('manager.storage')
 */
module.exports = class File {

  constructor(...parts) {
    Injector.directInject(this, __filename);
  }

  inject(storage) {
    this._storage = storage;
  }

  copy(target) {

  }

  move(target) {

  }

}
