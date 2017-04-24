'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['system:init', 'sysi'])
 *
 * @Inject('helper.tag')
 */
module.exports = class SystemCommand extends Command {

  inject(tags) {
    this._tags = tags;
  }

  define() {

  }

  execute() {
    const container = this._tags.get('init');
    log(container);
    log(container.classes());
    container.construct();
  }

}
