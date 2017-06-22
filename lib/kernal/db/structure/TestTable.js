'use strict';

module.exports = class TestTable {

  /**
   * @DBTabl
   */
  node(table, db) {
    table.addField('id', 'int', true, true);
    table.addField('title', 'varchar').length(255);
  }

  /**
   * @DBTabl
   */
  node__test(table, db) {
    const node = db.table('node');

    table.addField('id', 'int', true, true);
    table.addField('ref', 'int').onDelete(node.field('id'));
    table.addField('name', 'varchar').length(255).notNull();
  }

}