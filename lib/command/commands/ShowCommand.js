'use strict';

const Command = use('command/Command');

/**
 * @Command(['show', 's'])
 *
 * @Inject('handler.event')
 */
module.exports = class ShowCommand extends Command {

  inject(handler) {
    this._handler = handler;
  }

  define() {
    this
      .addArgument('type')
      .addOption('verbose', false, {
        aliases: ['v'],
      });
  }

  execute() {
    this._handler.trigger('command.show', this, this.argument('type'));
  }

}
