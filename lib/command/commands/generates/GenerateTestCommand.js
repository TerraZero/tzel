'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:test', 'gt'])
 *
 * @Inject('helper.options')
 */
module.exports = class GenerateTestCommand extends GenerateCommandBase {

  inject(options) {
    this._options = options;
  }

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Insert the module to add the generation.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('services', {
      ask: 'Service',
      description: 'Enter the services you need for the generation.',
      completions: this._options.list('services'),
      limit: true,
      multi: true,
    });

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the class name.',
      fallback: this.name,
      append: '.js',
    });

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'tests/',
      file: 'mod.$mod::$path/$name',
    });

    this.addField('injects', {
      hidden: true,
      replace: this.replaceInjects,
    });

    this.addFile('mod.command::generate/Service.js.gen', 'path');
  }

  execute() {
    super.execute();
  }

  name() {
    const mod = this.getFieldValue('mod');

    return mod.substring(0, 1).toUpperCase() + mod.substring(1) + 'Service';
  }

  replaceInjects(definition, value) {
    const services = this.getFieldValue('services');
    return services.join(', ');
  }

}
