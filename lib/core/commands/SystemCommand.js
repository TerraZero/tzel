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
    const file = new File('huhu/hier', 'test.txt.php');
    log(file.data());
    log(file.path());
    log(file.uri());
    log(file);
  }

}
