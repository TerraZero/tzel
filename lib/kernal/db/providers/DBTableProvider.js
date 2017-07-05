'use strict';

const Provider = use('boot/Provider');
const DBTable = use('db/annotations/DBTable');

/**
 * @Provider('dbtable')
 */
module.exports = class DBTableProvider extends Provider.class {

  scan(parser, data) {
    const tables = parser.get(DBTable.METHOD, DBTable);

    if (!tables) return false;

    data.add('providers', this.provider());

    for (const index in tables) {
      data.add('tables', {
        target: tables[index].target,
        table: tables[index].table,
        key: tables[index].value,
      });
    }
    return true;
  }

}
