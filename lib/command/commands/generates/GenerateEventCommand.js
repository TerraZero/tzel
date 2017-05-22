'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:event', 'ge'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateEventCommand extends GenerateCommandBase {

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Enter the module.',
      completions: this._options.list('mods'),
      limit: true,
    });

    this.addField('event', {
      ask: 'Event',
      description: 'Enter the event key.',
      fallback: this.getEventKey,
    });

    this.addField('name', {
      ask: 'Name',
      description: 'Enter the class name.',
      fallback: this._replacer.getClassName('event'),
    });

    this.addField('base', {
      ask: 'Base',
      description: 'Enter the base of the event.',
      completions: this._options.listBases('event'),
      fallback: 'event',
      limit: true,
    });
    this.addReplacer('base.use', this._replacer.getBasedOnUse('base'));
    this.addReplacer('base.extend', this._replacer.getBasedOnExtend('base'));
    this.addReplacer('base.annot', this._replacer.getBasedOnAnnotation('base'));

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

    this.addField('path', {
      ask: 'Path',
      description: 'Enter the path for the file.',
      fallback: 'events/',
    });

    this.addFile('mod.command::generate/Event.js.gen', 'mod.$mod::$path/$name.js');
  }

  getEventKey() {
    return this.getValue('mod') + '.event';
  }

}
