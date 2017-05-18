'use strict';

const Event = use('core/Event');

/**
 * @Base(
 *   value="event.command",
 *   description="The base class for command based events."
 * )
 */
module.exports = class CommandEventBase extends Event {

  out(...args) {
    log.apply(null, args);
  }

}
