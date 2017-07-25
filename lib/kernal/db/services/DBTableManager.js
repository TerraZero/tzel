'use strict';

const CallableCollection = use('core/CallableCollection');
const Callable = use('core/Callable');
const DBTable = use('db/annotations/DBTable');

/**
 * @Service('manager.dbtable')
 */
module.exports = class DBTableManager {

  constructor() {
    this._cache = {};
  }

  /**
   * @Inject('helper.boot')
   */
  inject(boot) {
    this._boot = boot;
  }

  getCallable(db = 'default') {
    if (this._cache[db] !== undefined) return this._cache[db];
    const collection = new CallableCollection();
    const classes = this._boot.getClassesFromProvider('dbtable');

    for (const index in classes) {
      const cdata = classes[index];
      for (const i in cdata.tables) {
        const table = cdata.tables[i];
        let tablename = table.table;

        if (tablename === DBTable.funcname) {
          tablename = table.target;
        }
        if (table.key.indexOf(db) === -1) continue;
        this.addCallable(collection, cdata, table);
      }
    }

    this._cache[db] = collection;
    return this._cache[db];
  }

  addCallable(collection, cdata, table) {
    const subject = this._boot.getSubject(cdata);
    const context = new subject();

    collection.add(Callable.fromContext(context, table.target, table));
  }

}
