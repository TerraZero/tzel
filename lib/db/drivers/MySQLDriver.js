'use strict';

const mysql = require('mysql');
const DBDriver = use('db/src/DBDriver');

/**
 * @DBDriver('mysql')
 */
module.exports = class MySQLDriver extends DBDriver {

  open(settings) {
    const connection = mysql.createConnection({
      host: settings.host,
      user: settings.user,
      password: settings.password,
      database: settings.database,
    });

    connection.connect();
    return connection;
  }

  close(settings, connection) {
    connection.end();
  }

}
