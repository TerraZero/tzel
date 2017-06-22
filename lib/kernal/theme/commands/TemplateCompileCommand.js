'use strict';

const pug = require('pug');

const File = use('file/File');
const Command = use('command/Command');

/**
 * @Command(['template:compile', 'tc'])
 *
 * @Inject('helper.boot')
 */
module.exports = class TemplateCompileCommand extends Command {

  inject(boot) {
    this._boot = boot;
  }

  define() {

  }

  execute() {
    const mods = this._boot.mods();
    this._sources = {};

    this.info(1, 'Create source files');
    this.createSource(mods);
    this.info(1, 'Create compiled files');
    this.createCompile();
    this.info(1, 'Finished');
  }

  createSource(mods) {
    for (const index in mods) {
      const templates = mods[index].getTemplates();

      if (templates.length) {
        this.info(2, 'Create source files from module [0]', mods[index].name());
        for (const i in templates) {
          this.executeFile(new File(templates[i]));
        }
      }
    }
  }

  executeFile(template) {
    const name = this.getName(template);
    const content = template.content();

    this.info(3, 'Create template [0] from file [1]', name.substring(0, name.length - 4), template);
    this._sources[name] = new File('tmp::source/' + name);
    template.copyTo(this._sources[name].create());
  }

  getName(template) {
    const modname = template.storage(1);
    const file = template.data('storageFile').substring('/templates'.length);

    return (modname + file).replace(/(\/)/g, '.');
  }

  createCompile() {
    for (const name in this._sources) {
      const file = this._sources[name];
      const target = new File('theme::compiled/' + file.data('name') + '.js');
      this.info(3, 'Compile [0] to [1]', file, target);
      const content = file.content();
      const compiled = pug.compileClient(content, {
        filename: file.path(),
      }) + '\nmodule.exports = template;\n';

      target
        .setContent(compiled)
        .create()
        .save();
    }
  }

}
