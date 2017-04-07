'use strict';

const Command = use('command/Command');
const File = use('storage/src/File');

/**
 * @Command(['system:init', 'sysi'])
 * 
 * @Inject('manager.storage')
 */
module.exports = class SystemCommand extends Command {

  inject(storage) {
    this._storage = storage;
  }

  define() {

  }

  execute() {
    const file = this._storage.resolve('public::', 'hallo/', 'hier.txt');
    log(file);
    const f = new File('public::', 'hallo/', 'hier.txt');
  }

}
