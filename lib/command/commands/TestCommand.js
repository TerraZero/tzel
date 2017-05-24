'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['test', 't'])
 *
 * @Inject('factory.route.event')
 */
module.exports = class TestCommand extends Command {

  inject(factory) {
    this._factory = factory;
  }

  define() {

  }

  execute() {
    const route = this._factory.newRoute('test.command.:type*');
    log(route.match('test.command.init'));
    log(route.match('test.command'));
    log(route.match('test.command.init.hallo'));
    log(route.match('test.commsand.init.hallo'));
  }

}
