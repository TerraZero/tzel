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
    const Test = use('core/src/ProxyClass')('core/src/TestClass');

    class Cool extends Test.class {

      a() {
        log('c');
      }

    }
    const c = new Cool();
    c.a();
  }

}
