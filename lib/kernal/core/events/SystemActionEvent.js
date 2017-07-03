'use strict';

const Event = use('core/Event');

/**
 * @Event(
 *   value='system.action',
 *   pattern='system.:action'
 * )
 */
module.exports = class SystemActionEvent extends Event.class {

  args() {
    return {
      action: this.action(),
    };
  }

  setArgs(...args) {
    this._action = args[0];
    this._trigger = args[1];
    this._args = args;
    return this;
  }

  getArgs() {
    return this._args;
  }

  trigger() {
    return this._trigger;
  }

  action() {
    return this._action;
  }

}
