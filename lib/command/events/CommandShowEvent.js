'use strict';

const CommandEventBase = use('command/events/CommandEventBase');

/**
 * @Event('command.show')
 */
module.exports = class CommandShowEvent extends CommandEventBase {

  setArgs(...args) {
    this._args = args;
    this._command = args[0];
    this._type = args[1];
    return this;
  }

  type() {
    return this._type;
  }

}
