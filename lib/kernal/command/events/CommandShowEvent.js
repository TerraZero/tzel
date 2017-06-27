'use strict';

const CommandEventBase = use('command/events/CommandEventBase');

/**
 * @Event('command.show')
 */
module.exports = class CommandShowEvent extends CommandEventBase.class {

  setArgs(command, type) {
    super.setArgs(command);
    this._type = type;
    return this;
  }

  type() {
    return this._type;
  }

}
