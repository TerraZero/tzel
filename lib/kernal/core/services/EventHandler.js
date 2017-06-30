'use strict';

/**
 * @Service('handler.event')
 */
module.exports = class EventHandler {

  /**
   * @Inject('handler.listener')
   */
  inject(listener) {
    this._listener = listener;
  }

  event(eventname) {
    return use('event::' + eventname);
  }

  listener(eventname) {
    return this._listener.getCallable(eventname);
  }

  fire(event) {
    const collection = this.listener(event);
    const returns = [];

    for (const callable of collection) {
      returns.push(callable.apply(callable.data().params));
    }

    event.setReturns(returns);
    return this;
  }

  trigger(eventname, ...args) {
    const event = this.event(eventname);

    event.setArgs.apply(event, args);
    return this.fire(event);
  }

}
