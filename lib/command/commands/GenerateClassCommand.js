'use strict';

const InputCommand = use('command/InputCommand');

/**
 * @Command(['generate:class', 'gclass'])
 *
 * @Inject('helper.module')
 */
module.exports = class GenerateClassCommand extends InputCommand {

  inject(mods) {
    this._mods = mods;
  }

  define() {

  }

  execute() {
    const mod = this.input('Module: ', this._mods.completion(), true);
    log(mod);
    const path = this.ask('Path', 'src/');
    log(path);
  }

}
