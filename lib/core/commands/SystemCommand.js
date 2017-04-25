'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['system:init', 'sysi'])
 *
 * @Inject('helper.tag')
 * @Inject('helper.boot')
 */
module.exports = class SystemCommand extends Command {

  inject(tags, boot) {
    this._tags = tags;
    this._boot = boot;
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
    const t = use('handler::myevent');
    const d = this._boot.getProviderData('handler', 'myevent');
    log(d);
  }

}
