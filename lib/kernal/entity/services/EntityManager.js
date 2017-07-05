'use strict';

const Entity = use('entity/Entity');

/**
 * @Service('manager.entity')
 */
module.exports = class EntityManager {

  constructor() {
    this._types = null;
  }

  /**
   * @Inject('helper.boot')
   * @Inject('manager.db')
   */
  inject(boot, db) {
    this._boot = boot;
    this._db = db;
  }

  load(type, ids) {
    if (!Array.isArray(ids)) ids = [ids];

    return this._db.query('entity.load', {
      entity: type,
      ids: ids,
    });
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
