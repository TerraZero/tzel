'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:test', 'gt'])
 *
 * @Inject('helper.boot')
 */
module.exports = class GenerateTestCommand extends GenerateCommandBase {

  inject(boot) {
    this._boot = boot;
  }

  generate() {
    this.addField('mod', {
      ask: 'Module',
      description: 'Insert the module to add the generation.',
      completions: this._boot.listMods(),
      limit: true,
    });

    this.addField('services', {
      ask: 'Service',
      description: 'Enter the services you need for the generation.',
      completions: this._boot.listServices(),
      limit: true,
      multi: true,
    });
  }

  execute() {
    super.execute();
    log(this.getFieldValue('mod'));
    log(this.getFieldValue('services'));
  }

}
