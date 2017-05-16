'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(
 *   value=['generate:class', 'gc'],
 *   type='generate'
 * )
 */
module.exports = class GenerateClassCommand extends GenerateCommandBase {

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Enter the module.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the class name.',
      fallback: this._replacer.getServiceClass('mod', 'Class'),
    });

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'src/',
    });

    this.addFile('mod.command::generate/Class.js.gen', 'mod.$mod::$path/$name.js');
  }

}
