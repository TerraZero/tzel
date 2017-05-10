'use strict';

const InputCommand = use('command/InputCommand');
const File = use('file/File');

const mods = use('service::helper.mods');

module.exports = class GenerateCommandBase extends InputCommand {

  define() {
    this._generate = {};
    this._files = {};
    this.generate();
  }

  execute() {
    this.executeGenerate();
  }

  generate() {

  }

  executeGenerate() {
    this.interact();
    this.buildReplacer();
    this.buildFiles();
  }

  interact() {
    for (const name in this._generate) {
      const field = this._generate[name];

      if (field.definition.hidden) continue;

      if (typeof field.definition.completions === 'function') {
        field.definition.completions = field.definition.completions.apply(this, [field.definition]);
      }
      if (typeof field.definition.fallback === 'function') {
        field.definition.fallback = field.definition.fallback.apply(this, [field.definition]);
      }

      if (field.definition.exit !== undefined) {
        field.definition.description = field.definition.description || '';
        if (field.definition.exit) {
          field.definition.description += this.color('exit')(' (exit: ' + field.definition.exit + ')');
        } else {
          field.definition.description += this.color('exit')(' (exit: [enter])');
        }
        if (field.definition.limit) {
          field.definition.completions.push(field.definition.exit || '');
        }
      }

      if (field.definition.multi) {
        field.value = [];
        let value = null;
        let exit = field.definition.exit || '';

        while (true) {
          value = this.input(field.definition);
          if (value === exit || value === null) break;
          field.value.push(value);
          if (field.definition.limit && field.definition.descending) {
            field.definition.completions.splice(field.definition.completions.indexOf(value), 1);
          }
        }
      } else {
        field.value = this.input(field.definition);
      }
    }
  }

  buildReplacer() {
    for (const name in this._generate) {
      const field = this._generate[name];

      field.definition.replaceValue = field.definition.replace.call(this, field.definition, field.value);
    }
  }

  buildFiles() {
    for (const to in this._files) {
      const from = this._files[to];
      const field = this.getField(to);
      const file = this.getFile(field.definition);

      if (file.exists()) {
        this.error('FileExistsAlready', 'The file [0] exists already. Abort.', file.path());
        continue;
      }

      from.copyTo(file.createDir());

      let content = file.content();

      for (const name in this._generate) {
        content = content.replace(new RegExp('{{' + name + '}}', 'g'), this.getField(name).definition.replaceValue);
      }
      file.setContent(content).save();
    }
  }

  getFile(definition) {
    let file = definition.file;

    for (const name in this._generate) {
      file = file.replace(new RegExp('\\$' + name, 'g'), this.getFieldValue(name));
    }
    return new File(file);
  }

  addField(name, definition) {
    if (definition.multi) {
      definition.descending = definition.descending || true;
      definition.exit = definition.exit || null;
    }

    definition.replaceKey = definition.replaceKey || name;
    definition.replace = definition.replace || this.simpleReplace;
    definition.replaceValue = null;

    this._generate[name] = {
      name: name,
      definition: definition,
      value: null,
    };
    return this;
  }

  addFile(from, to) {
    if (!(from instanceof File)) {
      from = new File(from);
    }
    this._files[to] = from;
    return this;
  }

  getField(name) {
    return this._generate[name];
  }

  getFieldValue(name) {
    if (this._generate[name].definition.append) {
      return this._generate[name].value + this._generate[name].definition.append;
    }
    return this._generate[name].value;
  }

  path(definition) {
    const mod = this.getFieldValue(definition.mod);

    return [new File('mod.' + mod + '::').path()];
  }

  simpleReplace(definition, value) {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value;
  }

}
