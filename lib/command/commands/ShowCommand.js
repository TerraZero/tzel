'use strict';

const Command = use('command/Command');
const Executer = use('command/Executer');

/**
 * @Command('show')
 * 
 * @Inject('simplify')
 * @Inject('helper.module')
 * @Inject('cli.formatter')
 */
module.exports = class ShowCommand extends Command {

  inject(simplify, modHelper, formatter) {
    this._simplify = simplify;
    this._modHelper = modHelper;
    this._formatter = formatter;
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
    const verbose = this.option('verbose');

    const providers = this.getBooter().getProviders();
    const head = ['Provider', 'Module'];
    if (verbose) {
      head.push('File');
    }
    const table = this._formatter.table({ head: head });

    for (const index in providers) {
      const line = [];
      const path = providers[index].parser()._path;
      const mod = this._modHelper.getModOfFile(path);

      line.push(providers[index].protocol());
      line.push(mod.getInfo('name'));
      if (verbose) {
        line.push(this._simplify.path(path));
      }
      table.push(line);
    }
    this.out(table.toString());
  }

  outModules() {
    const verbose = this.option('verbose');
    const status = this.option('status');

    const modules = this.getBooter().getMods(status);
    const head = ['Module', 'Name'];
    if (verbose) {
      head.push('Description');
      head.push('File');
    }
    const table = this._formatter.table({ head: head });

    for (const index in modules) {
      const line = [];

      line.push(modules[index].name());
      line.push(modules[index].getInfo('name'));

      if (verbose) {
        line.push(modules[index].getInfo('description'));
        line.push(this._simplify.path(modules[index].getBase()));
      }
      table.push(line);
    }
    this.out(table.toString());
  }

  outCommands() {
    const verbose = this.option('verbose');

    const providers = this.getBooter().getProviders();
    const head = ['Command', 'Aliases', 'Module'];
    if (verbose) {
      head.push('File');
    }
    const table = this._formatter.table({ head: head });

    for (const index in providers.command._register) {
      const line = [index];
      const names = providers.command._register[index].get('names');
      const path = providers.command._register[index].get('file');
      const mod = this._modHelper.getModOfFile(path);

      const aliases = [];
      for (const name in names) {
        if (names[name] !== index) aliases.push(names[name]);
      }
      if (aliases.length) {
        line.push(aliases.join(', '));
      } else {
        line.push('');
      }

      line.push(mod.getInfo('name'));

      if (verbose) {
        line.push(this._simplify.path(path));
      }
      table.push(line);
    }
    this.out(table.toString());
  }

}
