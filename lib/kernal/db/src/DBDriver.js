'use strict';

module.exports = class DBDriver {

  constructor(data) {
    this._name = data.key;
  }

  name() {
    return this._name;
  }

  open(settings) { }

  close(settings, connection) { }

}
