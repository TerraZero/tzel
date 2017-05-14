'use strict';

const InputCommand = use('command/InputCommand');

module.exports = class GenerateCommandBase extends InputCommand {

  construct() {
    this._generate = {
      fields: {},
      replacer: [],
      files: [],
    };
  }

  inject(norm) {
    this._norm = norm;
  }

  color(type) {
    switch (type) {
      case 'exit':
        return super.color('fallback');
      default:
        return super.color(type);
    }
  }

  execute() {
    this.generate();
    this.executeGenerate();
  }

  /**
   * Function to define the generate interface.
   */
  generate() { }

  executeGenerate() {
    this.interact();
    // this.buildReplacer();
    // this.buildFiles();
  }

  getOptionDefinition(type) {
    switch (type) {
      case 'field':
        return {
          ask: {
            type: 'string',
            fallback: null,
          },
          sep: {
            type: 'string',
            fallback: ': ',
          },
          hidden: {
            type: 'bool',
            fallback: false,
          },
          completions: {
            type: 'array',
            fallback: [],
          },
          fallback: {
            type: 'any',
            fallback: undefined,
          },
          exit: {
            type: 'string',
            fallback: null,
          },
          description: {
            type: 'string',
            fallback: null,
          },
          limit: {
            type: 'bool',
            fallback: false,
          },
          multi: {
            type: 'bool',
            fallback: false,
          },
          descending: {
            type: 'bool',
            fallback: false,
          },
        };
    }
    return null;
  }

  interact() {
    const fieldDefinition = this.getOptionDefinition('field');
    const cExit = this.color('exit');

    for (const name in this._generate.fields) {
      const field = this._generate.fields[name];
      field.calculated = this._norm.toOptions(field.definition, fieldDefinition, [this, name, field]);

      if (field.calculated.hidden) continue;

      if (field.calculated.multi) {
        field.calculated.definition = field.calculated.definition || '';
        if (field.calculated.exit) {
          field.calculated.description += cExit(' (exit: ' + field.calculated.exit + ')');
        } else {
          field.calculated.description += cExit(' (exit: [enter])');
        }

        let exit = field.calculated.exit || '';
        if (field.calculated.limit) {
          field.calculated.completions.push(exit || '');
        }

        field.value = [];
        let value = null;

        while (true) {
          value = this.input(field.calculated);
          if (value === exit || value === null) break;
          field.value.push(value);
          if (field.calculated.limit && field.calculated.descending) {
            field.calculated.completions.splice(field.calculated.completions.indexOf(value), 1);
          }
        }
      } else {
        field.value = this.input(field.calculated);
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
    this.addReplacer(definition.key || name, definition.target || definition.key || name, definition.replacer || null);

    this._generate.fields[name] = {
      name: name,
      definition: definition,
      calculated: null,
      value: null,
    };
    return this;
  }

  addReplacer(key, target, replacer) {
    this._generate.replacer.push({
      key: key,
      target: target,
      replacer: replacer
    });
    return this;
  }

  addFile(from, to) {
    this._generate.files.push({
      to: to,
      from: from,
    });
    return this;
  }

  getField(name) {
    return this._generate.fields[name];
  }

  getFieldValue(name) {
    if (this._generate.fields[name].definition.append) {
      return this._generate.fields[name].value + this._generate.fields[name].definition.append;
    }
    return this._generate.fields[name].value;
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
