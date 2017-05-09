'use strict';

const GenerateCommandBase = use('command/commands/generates/GenerateCommandBase');

/**
 * @Command(['generate:test', 'gt'])
 *
 * @Inject('helper.mods')
 */
module.exports = class GenerateTestCommand extends GenerateCommandBase {

  inject(mods) {
    this._mods = mods;
  }

  generate() {
    this.addField('test', {
      ask: 'Module',
      completions: this._mods.completion(),
      limit: true,
    });
  }

  execute() {
    super.execute();
    log(this.getFieldValue('test'));
  }

}
