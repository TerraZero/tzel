'use strict';

const CommandEventBase = use('command/events/CommandEventBase');

/**
 * @Event('command.system.init')
 */
module.exports = class SystemInitEvent extends CommandEventBase {

  startListener(listener, func) {
    this.out(this.name() + ':', listener.constructor.name, '=>', func.name + '()');
  }

}
