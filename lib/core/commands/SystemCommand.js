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
    const file = new File('/Users/loom07/Sites/tzel/test/cool/file.txt');

    log(file.data());
    log(file.path());
    log(file.exists());
    file.create();
    const t = parseInt(file.content());
    file.setContent(t + 1).save();
    log(file.content());
  }

}
