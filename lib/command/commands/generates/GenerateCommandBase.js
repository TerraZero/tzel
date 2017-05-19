'use strict';

const InputCommand = use('command/InputCommand');
const File = use('file/File');

/**
 * @Base(
 *   value='command.input.generate',
 *   inject='injectInputGenerate'
 * )
 *
 * @Inject('helper.norm')
 * @Inject('replacer.command')
 * @Inject('helper.options')
 */
module.exports = class GenerateCommandBase extends InputCommand {

  construct() {
    this._generate = {
      fields: {},
      replacer: {},
      files: [],
    };
  }

  injectInputGenerate(norm, replacer, options) {
    this._norm = norm;
    this._replacer = replacer;
    this._options = options;
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
    this.generateFiles();
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
            fallback: true,
          },
        };
      case 'file':
        return {
          to: {
            type: 'string',
            fallback: null,
          },
          from: {
            type: 'file',
            fallback: null,
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

  generateFiles() {
    const fileDefinition = this.getOptionDefinition('file');

    for (const index in this._generate.files) {
      const calculated = this._norm.toOptions(this._generate.files[index], fileDefinition, [this, index]);
      const from = calculated.from;
      const to = this.getFile(calculated.to);

      if (to.exists()) {
        this.error('FileExistsAlready', 'The file [0] exists already. Abort.', to.path());
        continue;
      }

      to
        .create()
        .setContent(this.replacing(from.content()))
        .save();

      this.out('Generate: ' + to.path());
    }
  }

  replacing(content) {
    const replacer = this.getReplacers();

    for (const index in replacer) {
      content = content.replace(new RegExp('{{' + index + '}}', 'g'), this.getReplaceValue(index));
    }
    return content;
  }

  getFile(file) {
    for (const name in this._generate.fields) {
      file = file.replace(new RegExp('\\$' + name, 'g'), this.getValue(name));
    }
    return new File(file);
  }

  getField(name) {
    return this._generate.fields[name];
  }

  getValue(name) {
    return this.getField(name).value;
  }

  getFields() {
    return this._generate.fields;
  }

  getReplacers() {
    return this._generate.replacer;
  }

  getReplaceValue(key) {
    if (this._generate.replacer[key].value === null) {
      this._generate.replacer[key].value = this._generate.replacer[key].replacer.apply(this, [this._generate.replacer[key]]);
    }
    return this._generate.replacer[key].value;
  }

  addField(name, definition) {
    this.addReplacer(definition.key || name, definition.replacer || null);

    this._generate.fields[name] = {
      name: name,
      definition: definition,
      calculated: null,
      value: null,
    };
    return this;
  }

  addReplacer(key, replacer) {
    this._generate.replacer[key] = {
      key: key,
      replacer: replacer || this._replacer.defaultReplacer,
      value: null,
    };
    return this;
  }

  addFile(from, to) {
    this._generate.files.push({
      to: to,
      from: from,
    });
    return this;
  }

}
