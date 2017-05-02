'use strict';

const Command = use('command/Command');

/**
 * @Command(['system:init', 'sysi'])
 *
 * @Inject('handler.event')
 */
module.exports = class SystemCommand extends Command {

  inject(events) {
    this._events = events;
  }

  define() {

  }

  execute() {
    const Data = use('core/Data');
    let c = new Data();
    c.doSet(['hallo', 'cool'], 'test');
    log(c.all());
    return;
    this._events.trigger('command.system.init');
  }

}
