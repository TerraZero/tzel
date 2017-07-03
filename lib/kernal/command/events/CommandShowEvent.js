'use strict';

const CommandEventBase = use('command/events/CommandEventBase');

/**
 * @Event(
 *   value='command.show',
 *   pattern='command.show.:type(.:provider)'
 * )
 */
module.exports = class CommandShowEvent extends CommandEventBase.class {

  setArgs(command, type, provider = null) {
    super.setArgs(command);
    this._type = type;
    this._provider = provider;
    return this;
  }

  type() {
    return this._type;
  }

  provider() {
    return this._provider;
  }

  args() {
    return {
      type: this.type(),
      provider: this.provider(),
    };
  }

}
