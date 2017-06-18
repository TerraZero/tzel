'use strict';

const sql = require('sql');

const Table = use('db/src/DBTable');

/**
 * @DBTable('db.tables')
 */
module.exports = class TestTable {

  define(map) {
    const t = new Table('user');

    t.field('id').type('int').primary();
    t.field('name').type('varchar').notNull();
    map.push(sql.define(t.prop()));
  }

}
