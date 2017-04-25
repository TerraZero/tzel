'use strict';

/**
 * @Service('handler.event')
 *
 * @Inject('helper.boot')
 */
module.exports = class EventHandler {

  inject(boot) {
    this._boot = boot;
  }

  getEvent(event) {
    const e = use('event::' + event);

    e.setArgs.apply(e, args);
    return e;
  }

  trigger(event, ...args) {
    const e = this.getEvent(event, args);

  }

}
