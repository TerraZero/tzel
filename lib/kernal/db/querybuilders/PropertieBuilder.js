'use strict';

/**
 * @Inject('manager.db')
 */
module.exports = class PropertieBuilder {

  inject(db) {
    this._db = db;
  }

  /**
   * @QueryBuilder('db.property')
   */
  byProperty(query) {
    log(query);
    log(this._db);
  }

}
