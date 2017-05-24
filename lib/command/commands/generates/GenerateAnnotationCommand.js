'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:annotation', 'ga'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateAnnotationCommand extends GenerateCommandBase {

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Enter the module.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the annotation name.',
      fallback: this._replacer.getClassName('mod'),
    });

    this.addFile('mod.command::generate/Annotation.js.gen', 'mod.$mod::annotations/$name.js');
  }

}
