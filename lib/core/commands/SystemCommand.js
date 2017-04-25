'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['system:init', 'sysi'])
 *
 * @Inject('helper.tag')
 * @Inject('helper.boot')
 * @Inject('handler.event')
 */
module.exports = class SystemCommand extends Command {

  inject(tags, boot, events) {
    this._tags = tags;
    this._boot = boot;
    this._events = events;
  }

  define() {

  }

  execute() {
    this.eventTest();
  }

  tagTest() {
    const container = this._tags.get('init');
    log(container);
    log(container.classes());
    container.construct();
  }

  eventTest() {
    this._events.trigger('test', 'cool', 5);
  }

}
