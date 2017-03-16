'use strict';

const Provider = use('core/Provider');

module.exports = class CoreProvider extends Provider {

  protocol() {
    return 'core';
  }

  invoke(string, data) {
    return tzel[string];
  }

}
