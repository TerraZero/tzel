'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const CommandAnnotation = use('command/annotations/Command');
const Injector = use('service/Injector');

/**
 * @Provider('command')
 */
module.exports = class CommandProvider extends Provider {

  constructor(parser) {
    super(parser);
  }

  getParsers(mod) {
    return mod.get(CommandAnnotation);
  }

  startRegister(booter) {
    super.startRegister(booter);
    this._booter = booter;
    this._parserClass = booter.getParserClass();
  }

  registerMods(mod) {
    const parsers = this.getParsers(mod);

    for (const index in parsers) {
      const names = this.getNames(parsers[index]);

      for (const n in names) {
        this._register[names[0]] = new Data({
          names: names,
          file: parsers[index].getPath(),
        });
        Injector.scan(parsers[index], this._register[names[0]]);
      }
    }
  }

  getNames(parser) {
    const command = parser.getDefinitions(CommandAnnotation, 0);
    const names = [];

    names.push(command.value);
    for (const index in command.alias) {
      names.push(command.alias[index]);
    }
    return names;
  }

  getBaseName(name) {
    for (const index in this._register) {
      if (this._register[index].get('names').indexOf(name) !== -1) return index;
    }
  }

  provide(string) {
    const name = this.getBaseName(string);

    return this.invoke(name, this._register[name]);
  }

  invoke(string, data) {
    if (!data) return null;

    let subject = require(data.get('file'));
    subject = new subject(string, data.get('names'), this._booter);
    Injector.injecting(subject, data);
    return subject;
  }

}
