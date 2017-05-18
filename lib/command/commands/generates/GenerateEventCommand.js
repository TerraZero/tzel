'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(
 *   value=['generate:event', 'ge'],
 *   type='generate'
 * )
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