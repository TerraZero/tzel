'use strict';

const Event = use('core/Event');

module.exports = class CommandEventBase extends Event {

  out(...args) {
    log.apply(null, args);
  }

}
