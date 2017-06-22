'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:element', 'gel'])
 *
 * @BasedOn('command.input.generate')
 */
module.exports = class GenerateElementCommand extends GenerateCommandBase {

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
      fallback: this._replacer.getClassName('mod'),
    });

    this.addField('element', {
      ask: 'Element',
      description: 'Enter the element type.',
      fallback: this.getElement,
    });

    this.addField('base', {
      ask: 'Base',
      description: 'Enter the base of the class.',
      completions: this._options.listBases('element'),
      fallback: 'element',
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
      fallback: 'elements/',
    });

    this.addFile('mod.theme::generate/Element.js.gen', 'mod.$mod::$path/$name.js');
  }

  getElement() {
    return this.getValue('name').toLowerCase();
  }

}
