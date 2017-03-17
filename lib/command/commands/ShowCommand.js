'use strict';

const Command = use('command/Command');
const Executer = use('command/Executer');

/**
 * @Command(
 *   value="show"
 * )
 */
module.exports = class ShowCommand extends Command {

  define() {
    this
      .addArgument('type');
  }

  execute() {
    const type = this.argument('type');

    switch (type) {
      case 'providers':
        this.outProviders();
        break;
      default:
        this.error('TypeNotDefinedException', 'Type [0] not defined!', type);
        break;
    }
  }

  outProviders() {
    const providers = this.getBooter().getProviders();

    for (const index in providers) {
      this.out(providers[index].protocol());
    }
  }

}
