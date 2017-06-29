'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:exception', 'gex'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateExceptionCommand extends GenerateCommandBase.class {

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Enter the module.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the exception name.',
      fallback: this._replacer.getClassName('mod', 'Exception'),
    });

    this.addField('exception', {
      ask: 'Exception',
      description: 'Enter the key of the exception.',
      fallback: this._replacer.getLowerName('name'),
    });

    this.addField('message', {
      ask: 'Message',
      description: 'Enter the message of the exception.',
    });

    this.addField('base', {
      ask: 'Base',
      description: 'Enter the base of the class.',
      completions: this._options.listBases('exception'),
      fallback: 'exception',
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

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: '/exceptions',
    });

    this.addFile('mod.command::generate/Exception.js.gen', 'mod.$mod::$path/$name.js');
  }

}
