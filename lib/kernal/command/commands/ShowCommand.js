'use strict';

const color = require('cli-color');

const Command = use('command/Command');

/**
 * @Command(['show', 's'])
 */
module.exports = class ShowCommand extends Command.class {

  /**
   * @Inject('handler.event')
   */
  inject(handler) {
    this._handler = handler;
  }

  define() {
    this
      .addArgument('type', 'commands')
      .addOption('verbose', false, {
        aliases: ['v'],
      });
  }

  execute() {
    this._handler.trigger('command.show', this, this.argument('type'));
  }

  color(type) {
    switch (type) {
      case 'group':
        return color.green;
      case 'args':
        return color.blue;
      case 'options':
        return color.yellow;
      default:
        return super.color(type);
    }
  }

}
