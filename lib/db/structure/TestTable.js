'use strict';

/**
 * @DBTable('db.tables')
 */
module.exports = class TestTable {

  define(db) {
    const n = db.addTable('node');

    n.addField('id').type('int').primary();

    const z = db.table('node');

    const t = db.addTable('user');

    t.addField('id', 'int', true, true).foreign('node', 'id', 'onDelete', 'cascade');
    t.addField('name', 'varchar').length(255).notNull().onDelete(z.field('id'));
  }

}
