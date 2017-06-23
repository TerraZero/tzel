'use strict';

/**
 * @Inject('manager.entity')
 */
module.exports = class EntityQB {

  inject(manager) {
    this._manager = manager;
  }

  /**
   * @QueryBuilder(
   *   value='entity.load',
   *   context='entity.:entity'
   * )
   */
  load(query, args, db) {
    log('new');
    const table = this.getTable(db, args.entity);

    const base = table.select()
      .from(this.getTable(db, args.entity))
      .where(this.getTable(db, args.entity).id.in('::ids'));

    query.addQuery(base);
  }

  getTable(db, type) {
    return db[this._manager.getTable(type)];
  }

}
