'use strict';

/**
 * @DBTable('db.tables')
 */
module.exports = class TestTable {

  define(db) {
    const n = db.addTable('node');

    n.field('id').type('int').primary();

    const t = db.addTable('user');

    t.field('id').type('int').primary().foreign('node', 'id', 'onDelete', 'cascade');
    t.field('name').type('varchar').notNull();
  }

}
