'use strict';

const InputCommand = use('command/InputCommand');
const File = use('file/File');

/**
 * @Command(['generate:service', 'gs'])
 *
 * @Inject('helper.mods')
 * @Inject('helper.boot')
 */
module.exports = class GenerateServiceCommand extends InputCommand {

  inject(mods, boot) {
    this._mods = mods;
    this._boot = boot;
  }

  define() {
  }

  execute() {
    this._services = null;

    this.out();
    this.out('Generate Service Class');
    this.out();

    const mod = this.input('Module: ', this._mods.completion(), true);
    const service = this.ask('Service', mod + '.service');
    const name = this.ask('Class', this.getClassName(service));
    const path = this.ask('Path', 'services/');
    const injects = [];

    this.out('Inject dependencies, enter nothing to stop.');
    while (true) {
      const inject = this.input('Inject: ', this.getServices(), true);

      if (inject) {
        injects.push(inject);
      } else {
        break;
      }
    }

    this.out();
    this.out('Overview:');
    this.out('- Module: ' + mod);
    this.out('- Service: ' + service);
    this.out('- Class: ' + name);
    this.out('- Path: ' + path);
    this.out('- Inject: [' + injects.join(', ') + ']');
    this.out();
    const ok = this.ask('Do you want to generate?', 'yes');
    if (ok !== 'yes') return;

    const template = new File('mod.command::generate/Service.js.gen');
    const target = new File('mod.' + mod + '::' + path, name + '.js');

    if (target.exists()) {
      this.error('FileExistsAlready', 'The file [0] exists already. Abort.', target.path());
      return;
    }

    template.copyTo(target.createDir());
    let content = target.content();
    content = content.replace(/{{name}}/g, name);
    content = content.replace(/{{service}}/g, service);
    content = content.replace(/{{annot.injects}}/g, this.replaceAnnotInjects(injects));
    content = content.replace(/{{injects}}/g, this.replaceInjects(injects));
    target.setContent(content).save();
  }

  getClassName(service) {
    let name = '';
    const splits = service.split('.').reverse();

    for (const index in splits) {
      name += splits[index].substring(0, 1).toUpperCase() + splits[index].substring(1);
    }
    return name;
  }

  getServices() {
    if (!this._services) {
      const data = this._boot.provider('service').getData();
      this._services = [''];

      for (const index in data) {
        this._services.push(index);
      }
    }
    return this._services;
  }

  replaceInjects(injects) {
    if (!injects || injects.length === 0) return '';
    const replace = [''];
    const names = [];

    for (const index in injects) {
      const splits = injects[index].split('.');
      names.push(splits[splits.length - 1]);
    }
    replace.push('  inject(' + names.join(', ') + ') {');
    for (const index in names) {
      replace.push('    this._' + names[index] + ' = ' + names[index] + ';');
    }
    replace.push('  }');
    replace.push('');
    return replace.join('\n');
  }

  replaceAnnotInjects(injects) {
    if (!injects || injects.length === 0) return '';
    const replace = ['', ' *'];

    for (const index in injects) {
      replace.push(' * @Inject(\'' + injects[index] + '\')');
    }
    return replace.join('\n');
  }

}
