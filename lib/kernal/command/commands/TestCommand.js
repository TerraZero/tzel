'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['test', 't'])
 */
module.exports = class TestCommand extends Command {

  define() {

  }

  execute() {
    const Test = use('core/src/ProxyClassCallable')('core/src/TestClass');

    const t = new Test();
    t._b = 4;
    t._a = 1;
    log(t._a);
  }

}
