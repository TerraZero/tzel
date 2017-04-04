'use strict';

const Table = require('cli-table2');

/**
 * @Service('formatter.cli')
 */
module.exports = class CliFormatterService {

  table(options = {}, ...head) {
    if (head.length) {
      options.head = head;
    }
    return new Table(options);
  }

}
