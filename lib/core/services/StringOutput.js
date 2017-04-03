'use strict';

const path = require('path');

/**
 * @Service('string.out')
 */
module.exports = class StringOutput {

  simplePath(...args) {
    const norm = path.join.apply(path, args);
    return norm.substring(base('lib').length + 1);
  }

  path(...args) {
    log(this.simplePath.apply(this, args));
  }

}
