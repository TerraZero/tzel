'use strict';

const Entity = use('entity/src/Entity');

/**
 * @Service('manager.entity')
 *
 * @Inject('helper.boot')
 * @Inject('manager.db')
 */
module.exports = class EntityManager {

  constructor() {
    this._types = null;
  }

  inject(boot, db) {
    this._boot = boot;
    this._db = db;
  }

  load(type, id) {
    const entityType = use('entity::' + type);
    const db = this._db.get('default');
    const query = entityType.load(db, id).toQuery();
    const connection = this._db.connection();

    connection.query(query.text, query.values, function (error, results, fields) {
      if (error) throw error;
      log(results);
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
