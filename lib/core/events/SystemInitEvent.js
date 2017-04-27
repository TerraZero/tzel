'use strict';

const CommandEventBase = use('command/events/CommandEventBase');

/**
 * @Event('command.system.init')
 */
module.exports = class SystemInitEvent extends CommandEventBase {

  startListener(listener, func) {
    log(this.name() + ':', listener.constructor.name, '=>', func.name + '()');
  }

}
