'use strict';

const Event = use('core/Event');

/**
 * @Base('event.command')
 */
module.exports = class CommandEventBase extends Event {

  setArgs(...args) {
    this._args = args;
    this._command = args[0];
    return this;
  }

  command() {
    return this._command;
  }

}
