'use strict';

/**
 * @Service('handler.event')
 */
module.exports = class EventHandler {

  event(event) {
    return use('event::' + event);
  }

  listener(event) {
    return use('listeners::' + event);
  }

  fire(event) {
    const listeners = this.listener(event.name());
    const functions = listeners.functions();
    const returns = [];

    for (const index in functions) {
      event.startListener(functions[index].context, functions[index].func);
      const r = functions[index].func.apply(functions[index].context, [event]);
      event.endListener(functions[index].context, functions[index].func);
      if (r !== undefined) returns.push(r);
    }
    event.setReturns(returns);
    return this;
  }

  trigger(event, ...args) {
    const e = this.event(event);

    e.setArgs.apply(e, args);
    return this.fire(e);
  }

}
