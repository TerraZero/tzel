'use strict';

const InputCommand = use('command/InputCommand');

module.exports = class GenerateCommandBase extends InputCommand {

  define() {
    this._generate = {};
    this.generate();
  }

  execute() {
    this.executeGenerate();
  }

  generate() {

  }

  executeGenerate() {
    this.interact();
  }

  interact() {
    for (const name in this._generate) {
      const field = this._generate[name];

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

  addField(name, definition) {
    if (definition.multi) {
      definition.descending = definition.descending || true;
      definition.exit = definition.exit || null;
    }

    if (definition.exit !== undefined) {
      definition.description = definition.description || '';
      if (definition.exit) {
        definition.description += this.color('exit')(' (exit: ' + definition.exit + ')');
      } else {
        definition.description += this.color('exit')(' (exit: [enter])');
      }
      if (definition.limit) {
        definition.completions.push(definition.exit || '');
      }
    }

    this._generate[name] = {
      name: name,
      definition: definition,
      value: null,
    };
    return this;
  }

  getField(name) {
    return this._generate[name];
  }

  getFieldValue(name) {
    return this._generate[name].value;
  }

}
