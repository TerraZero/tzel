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
      this._generate[name].value = this.input(this._generate[name].definition);
    }
  }

  addField(name, definition) {
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
