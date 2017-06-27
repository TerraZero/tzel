'use strict';

const Event = use('core/Event');

/**
 * @Event('system.end')
 */
module.exports = class SystemEndEvent extends Event.class {

  setArgs(reason, ...args) {
    this._reason = reason;
    this._args = args;
    return this;
  }

  reason() {
    return this._reason;
  }

  args() {
    return this._args;
  }

}
