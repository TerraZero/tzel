'use strict';

const Table = require('cli-table2');

/**
 * @Service(
 *   value = 'formatter.cli',
 *   description = 'Formatter for cli output.'
 * )
 */
module.exports = class CliFormatterService {

  table(options = {}, ...head) {
    if (head.length) {
      options.head = head;
    }
    return new Table(options);
  }

}
