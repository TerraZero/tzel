'use strict';

module.exports = class TestTable {

  /**
   * @DBTable
   */
  test(table, db) {
    table.addField('id', 'int', true, true);
    table.addField('title', 'varchar').length(255);
  }

  /**
   * @DBTable
   */
  test_data(table, db) {
    const test = db.table('test');

    table.addField('id', 'int', true, true).onDelete(test.field('id'));
    table.addField('value', 'varchar').length(255).notNull();
  }

}
