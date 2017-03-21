'use strict';

const Command = use('command/Command');

/**
 * @Command('request:test')
 * @Inject('deliverer')
 */
module.exports = class RequestTestCommand extends Command {

  inject(deliverer) {
    this._deliverer = deliverer;
  }

  define() {
    this
      .addArgument('path');
  }

  execute() {
    const path = '/' + this.argument('path');
    const request = this._deliverer.getRequest(path);

    if (!request) {
      this.info(1, 'No match for path [0]', path);
      return;
    }

    request.execute();
  }

}
