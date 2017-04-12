'use strict';

const Command = use('command/Command');

/**
 * @Command('show')
 *
 * @Inject('simplify')
 * @Inject('helper.module')
 * @Inject('formatter.cli')
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
      case 'services':
        this.outServices();
        break;
      case 'test':
        this.table(['span 1', 'span 2'], [['col 1 1', 'col 1 2'], ['col 2 1', 'col 2 2']]);
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
    const head = ['Command', 'Aliases', 'Group', 'Module'];
    if (verbose) {
      head.push('File');
    }
    const table = this._formatter.table({ head: head });

    for (const index in providers.command._register) {
      const line = [];
      const data = providers.command._register[index];
      const names = data.get('names');
      const path = data.get('file');
      const annotation = data.get('annotation');
      const mod = this._modHelper.getModOfFile(path);

      line.push(names[0]);

      const aliases = [];
      for (const name in names) {
        if (names[name] !== index) aliases.push(names[name]);
      }
      if (aliases.length) {
        line.push(aliases.join(', '));
      } else {
        line.push('');
      }

      line.push(annotation.getGroup());
      line.push(mod.getInfo('name'));

      if (verbose) {
        line.push(this._simplify.path(path));
      }
      table.push(line);
    }
    this.out(table.toString());
  }

  outServices() {
    const verbose = this.option('verbose');

    const providers = this.getBooter().getProviders();
    const head = ['Service', 'Module'];
    if (verbose) {
      head.push('File');
    }
    const table = this._formatter.table({ head: head });

    for (const index in providers.service._register) {
      const line = [];
      const data = providers.service._register[index];
      const path = data.get('file');
      const mod = this._modHelper.getModOfFile(path);

      line.push(data.get('key'));
      line.push(mod.getInfo('name'));

      if (verbose) {
        line.push(this._simplify.path(path));
      }
      table.push(line);
    }
    this.out(table.toString());
  }

}
