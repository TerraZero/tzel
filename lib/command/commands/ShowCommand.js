'use strict';

const Command = use('command/Command');
const Executer = use('command/Executer');

/**
 * @Command(
 *   value="show"
 * )
 * @Inject('simplify')
 * @Inject('helper.module')
 */
module.exports = class ShowCommand extends Command {

  inject(simplify, modHelper) {
    this._simplify = simplify;
    this._modHelper = modHelper;
  }

  define() {
    this
      .addArgument('type')
      .addOption('verbose', false, {
        aliases: ['v'],
      })
      .addOption('status', 'mods', {
        aliases: ['s'],
      });
  }

  execute() {
    const type = this.argument('type');

    switch (type) {
      case 'providers':
        this.outProviders();
        break;
      case 'modules':
        this.outModules();
        break;
      case 'commands':
        this.outCommands();
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

  outModules() {
    const verbose = this.option('verbose');
    const status = this.option('status');
    const modules = this.getBooter().getMods(status);

    if (verbose) {
      for (const index in modules) {
        this.out(modules[index].name() + ' : ' + modules[index].getInfo('name'));
      }
    } else {
      for (const index in modules) {
        this.out(modules[index].name());
      }
    }
  }

  outCommands() {
    const providers = this.getBooter().getProviders();

    for (const index in providers.command._register) {
      const out = [];
      const names = providers.command._register[index].get('names');
      const mod = this._modHelper.getModOfFile(providers.command._register[index].get('file'));

      for (const name in names) {
        if (names[name] !== index) out.push(names[name]);
      }

      if (out.length) {
        this.out(index + ' (' + out.join(', ') + ') [' + mod.getInfo('name') + ']');
      } else {
        this.out(index + ' [' + mod.getInfo('name') + ']');
      }
    }
  }

}
