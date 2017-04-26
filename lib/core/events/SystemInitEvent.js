'use strict';

const Event = use('core/Event');

/**
 * @Event('command.system.init')
 */
module.exports = class SystemInitEvent extends Event {

  startListener(listener, func) {
    log(this.name() + ':', listener.constructor.name, '=>', func.name);
  }

}
