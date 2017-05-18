'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(
 *   value=['generate:command', 'gco'],
 *   type='generate'
 * )
 */
module.exports = class GenerateCommandCommand extends GenerateCommandBase {

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Enter the module.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('command', {
      ask: 'Command',
      description: 'Enter the new command name.',
      fallback: this._replacer.getCommandName('mod', 'command'),
    });

    this.addField('alias', {
      ask: 'Aliases',
      description: 'Enter the aliases for the command.',
      multi: true,
    });
    this.addReplacer('command.array', this.getCommandArray);

    this.addField('services', {
      ask: 'Service',
      description: 'Enter services for dependencies.',
      completions: this._options.listProviderOptions('service'),
      limit: true,
      multi: true,
      replacer: this._replacer.getServiceFunction('services'),
      key: 'injects',
    });
    this.addReplacer('annot.injects', this._replacer.getServiceAnnotation('services'));

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the class name.',
      fallback: this.getGenerateCommandName,
    });

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'commands/',
    });

    this.addFile('mod.command::generate/Command.js.gen', 'mod.$mod::$path/$name.js');
  }

  getCommandArray() {
    const command = this.getValue('command');
    const aliases = this.getValue('alias');
    const array = [command];

    for (const index in aliases) {
      array.push(aliases[index]);
    }
    return '[\'' + array.join('\', \'') + '\']';
  }

  getGenerateCommandName() {
    const command = this.getValue('command').split(':');
    let name = '';

    for (const index in command) {
      name += command[index].substring(0, 1).toUpperCase() + command[index].substring(1);
    }
    return name + 'Command';
  }

}
