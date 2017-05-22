'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['test', 't'])
 *
 * @Inject('helper.boot')
 * @Inject('helper.options')
 */
module.exports = class TestCommand extends Command {

  inject(boot, options) {
    this._boot = boot;
    this._options = options;
  }

  define() {

  }

  execute() {
    const data = this._boot.getProviderData('base', 'event.command');
    const file = new File(data.get('file'));
    log(file);
    log(file.getUsePath());
  }

}
