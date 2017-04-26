'use strict';

const Event = use('core/Event');

/**
 * @Event('command.system.init')
 */
module.exports = class TestEvent extends Event {

  startListener(listener, func) {
    log('system.init:', listener.constructor.name, '=>', func);
  }

}
