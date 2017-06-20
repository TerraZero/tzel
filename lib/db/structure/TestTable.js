'use strict';

/**
 * @DBTable('db.tables')
 */
module.exports = class TestTable {

  define(db) {
    const node = db.addTable('node');

    node.addField('id', 'int', true, true);
    node.addField('title', 'varchar').length(255);

    const node__test = db.addTable('node__test');

    node__test.addField('id', 'int', true, true);
    node__test.addField('ref', 'int').onDelete(node__test.field('id'));
    node__test.addField('name', 'varchar').length(255).notNull();
  }

}
