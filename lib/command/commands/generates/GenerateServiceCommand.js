'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:service', 'gs'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateServiceCommand extends GenerateCommandBase {

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Enter the module.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('service', {
      ask: 'Service',
      description: 'Enter the new service name.',
      fallback: this._replacer.getServiceName('mod', 'helper'),
    });

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
      fallback: this._replacer.getServiceClass('service'),
    });

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'services/',
    });

    this.addFile('mod.command::generate/Service.js.gen', 'mod.$mod::$path/$name.js');
  }

}
