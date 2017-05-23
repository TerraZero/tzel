'use strict';

const Command = use('command/Command');

/**
 * @Command(['system:init', 'sysi'])
 *
 * @Inject('handler.event')
 */
module.exports = class SystemInitCommand extends Command {

  inject(events, boot) {
    this._events = events;
  }

  define() {

  }

  execute() {
    this._events.trigger('command.system.init', this);
  }

}
