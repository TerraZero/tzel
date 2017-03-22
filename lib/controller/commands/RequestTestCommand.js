'use strict';

const Command = use('command/Command');

/**
 * @Command('request:test')
 * @Inject('deliver')
 */
module.exports = class RequestTestCommand extends Command {

  inject(deliver) {
    this._deliver = deliver;
  }

  define() {
    this
      .addArgument('path');
  }

  execute() {
    const path = '/' + this.argument('path');
    const request = this._deliver.getRequest(path);

    if (!request) {
      this.info(1, 'No match for path [0]', path);
      return;
    }

    request.execute();
  }

}
