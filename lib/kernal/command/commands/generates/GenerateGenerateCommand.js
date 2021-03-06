'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:gencommand', 'ggc'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateGenerateCommand extends GenerateCommandBase {

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
      fallback: this._replacer.getCommandName('mod', 'generate'),
    });

    this.addField('alias', {
      ask: 'Aliases',
      description: 'Enter the aliases for the command.',
      multi: true,
    });
    this.addReplacer('command.array', this.getCommandArray);

    this.addField('base', {
      ask: 'Base',
      description: 'Enter the base of the command.',
      completions: this._options.listBases('command.input.generate'),
      fallback: 'command.input.generate',
      limit: true,
    });
    this.addReplacer('base.use', this._replacer.getBasedOnUse('base'), 'uses', 'prepend');
    this.addReplacer('base.extend', this._replacer.getBasedOnExtend('base'));
    this.addReplacer('base.annot', this._replacer.getBasedOnAnnotation('base'), 'annot', 'prepend');

    this.addField('services', {
      ask: 'Service',
      description: 'Enter services for dependencies.',
      completions: this._options.listProviderOptions('service'),
      limit: true,
      multi: true,
      replacer: this._replacer.getServiceFunction('services'),
      key: 'injects',
    });
    this.addReplacer('annot.injects', this._replacer.getServiceAnnotation('services'), 'annot', 'prepend');

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the class name.',
      fallback: this.getGenerateCommandName,
    });

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'commands/generates/',
    });

    this.addFile('mod.command::generate/GenerateCommand.js.gen', 'mod.$mod::$path/$name.js');
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
