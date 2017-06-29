'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:class', 'gc'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateClassCommand extends GenerateCommandBase.class {

  define() {
    this.addOption('base', false);
  }

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

    if (this.option('base')) {
      this.addField('base', {
        ask: 'Base',
        description: 'Enter the base of the class.',
        completions: this._options.listBases(),
        limit: true,
      });
      this.addReplacer('base.use', this._replacer.getBasedOnUse('base'), 'uses', 'prepend');
      this.addReplacer('base.extend', this._replacer.getBasedOnExtend('base'));
      this.addReplacer('base.annot', this._replacer.getBasedOnAnnotation('base'), 'annot', 'prepend');
    }

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'src/',
    });

    if (this.option('base')) {
      this.addFile('mod.command::generate/ClassBase.js.gen', 'mod.$mod::$path/$name.js');
    } else {
      this.addFile('mod.command::generate/Class.js.gen', 'mod.$mod::$path/$name.js');
    }
  }

}
