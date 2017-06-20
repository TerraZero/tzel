'use strict';

/**
 * @Base('dbdriver')
 */
module.exports = class DBDriver {

  constructor(data) {
    this._name = data.get('key');
  }

  name() {
    return this._name;
  }

  open(settings) { }

  close(settings, connection) { }

}
