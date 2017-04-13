'use strict';

const Command = use('command/Command');
const File = use('storage/File');

/**
 * @Command(['system:init', 'sysi'])
 */
module.exports = class SystemCommand extends Command {

  inject(storage) {
    this._storage = storage;
  }

  define() {

  }

  execute() {
    const file = new File('mod/storage::', 'huhu/hier', 'test.txt');
    log(file.path());
  }

}
