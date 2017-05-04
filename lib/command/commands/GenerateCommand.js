'use strict';

const InputCommand = use('command/InputCommand');

/**
 * @Command(['generate', 'gen'])
 *
 * @Inject('helper.module')
 */
module.exports = class GenerateCommand extends InputCommand {

  inject(mods) {
    this._mods = mods;
  }

  define() {

  }

  execute() {
    const mod = this.input('Module: ', this._mods.completion(), true);
    log(mod);
  }

}
