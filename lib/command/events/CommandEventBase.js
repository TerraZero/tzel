'use strict';

const Event = use('core/Event');

/**
 * @Base('event.command')
 */
module.exports = class CommandEventBase extends Event {

  out(...args) {
    log.apply(null, args);
  }

}
