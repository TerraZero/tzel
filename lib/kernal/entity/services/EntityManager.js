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
   * @Inject('boot')
   * @Inject('db')
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
      const classes = this._boot.getClassesFromProvider('entity');
      this._types = [];

      for (const path in classes) {
        this._types.push(classes[path].key);
      }
    }
    return this._types;
  }

}
