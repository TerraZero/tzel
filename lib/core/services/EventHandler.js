'use strict';

/**
 * @Service('handler.event')
 */
module.exports = class EventHandler {

  event(event) {
    return use('event::' + event);
  }

  fire(event) {
    log(event);
    return this;
  }

  trigger(event, ...args) {
    const e = this.event(event);

    e.setArgs.apply(e, args);
    return this.fire(e);
  }

}
