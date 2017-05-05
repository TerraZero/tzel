'use strict';

const InputCommand = use('command/InputCommand');
const File = use('file/File');

/**
 * @Command(['generate:class', 'gc'])
 *
 * @Inject('helper.mods')
 */
module.exports = class GenerateClassCommand extends InputCommand {

  inject(mods) {
    this._mods = mods;
  }

  define() {

  }

  execute() {
    this.out();
    this.out('Generate Class File');
    this.out();

    const mod = this.input('Module: ', this._mods.completion(), true);
    const name = this.ask('Class', 'DefaultClass');
    const path = this.ask('Path', 'src/');

    this.out();
    this.out('Overview:');
    this.out('- Module: ' + mod);
    this.out('- Class: ' + name);
    this.out('- Path: ' + path);
    this.out();
    const ok = this.ask('Do you want to generate?', 'yes');
    if (ok !== 'yes') return;

    const template = new File('mod.command::generate/Class.js.gen');
    const target = new File('mod.' + mod + '::' + path, name + '.js');

    template.copyTo(target.createDir());
    let content = target.content();
    content = content.replace(/{{name}}/g, name);
    target.setContent(content).save();
  }

}
