'use strict';

const Entity = use('entity/src/Entity');

/**
 * @Service('manager.entity')
 *
 * @Inject('helper.boot')
 */
module.exports = class EntityManager {

  constructor() {
    this._types = null;
  }

  inject(boot) {
    this._boot = boot;
  }

  load(type, id) {
    const entityType = use('entity::' + type);

    return entityType.create({ id: id });
  }

  getTable(type) {
    return this.type(type).table();
  }

  type(type) {
    return use('entity::' + type);
  }

  types() {
    if (this._types === null) {
      const data = this._boot.provider('entity').getData();
      this._types = [];

      for (const type in data) {
        this._types.push(type);
      }
    }
    return this._types;
  }

}
