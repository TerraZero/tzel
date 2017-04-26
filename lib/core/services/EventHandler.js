'use strict';

/**
 * @Service('handler.event')
 */
module.exports = class EventHandler {

  event(event) {
    return use('event::' + event);
  }

  listener(event) {
    return use('listener::' + event);
  }

  fire(event) {
    const returns = this.listener(event.name()).call(event);

    event.setReturns(returns);
    return this;
  }

  trigger(event, ...args) {
    const e = this.event(event);

    e.setArgs.apply(e, args);
    return this.fire(e);
  }

}
