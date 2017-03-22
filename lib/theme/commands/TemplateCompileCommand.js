'use strict';

const fs = require('graceful-fs');
const path = require('path');
const pug = require('pug');

const Command = use('command/Command');

/**
 * @Command(
 *   value='template:compile',
 *   alias=['tc']
 * )
 */
module.exports = class TemplateCompileCommand extends Command {

  define() {

  }

  execute() {
    const mods = this.getBooter().getMods();
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
      const root = mods[index].getPath(mods[index].name(), 'templates');

      if (templates.length) {
        this.info(2, 'Create source files from module [0]', mods[index].name());
        for (const i in templates) {
          this.executeMod(mods[index], templates[i], root);
        }
      }
    }
  }

  executeMod(mod, template, root) {
    const name = this.getName(mod, template, root);
    const content = fs.readFileSync(template);
    const source = base('temp/theme/source', name);

    this.info(3, 'Create template [0] from file [1]', name.substring(0, name.length - 4), template);
    this._sources[name] = source;
    fs.writeFileSync(source, content);
  }

  getName(mod, template, root) {
    return (mod.name() + template.substring(root.length)).replace(/(\/)/g, '.');
  }

  createCompile() {
    for (const name in this._sources) {
      this.info(3, 'Compile [0]', this._sources[name]);
      const content = fs.readFileSync(this._sources[name]);
      const compiled = pug.compileClient(content, {
        filename: this._sources[name],
      }) + '\nmodule.exports = template;\n';

      fs.writeFileSync(base('temp/theme/compiled', name.substring(0, name.length - 4) + '.js'), compiled);
    }
  }

}
