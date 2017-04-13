'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['system:init', 'sysi'])
 */
module.exports = class SystemCommand extends Command {

  define() {

  }

  execute() {
    const file = new File('mod/file::', 'huhu/hier', 'test.txt');
    log(file.path());
  }

}
