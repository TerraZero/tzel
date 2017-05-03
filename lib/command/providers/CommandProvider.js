'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const CommandAnnotation = use('command/annotations/Command');
const Injector = use('service/Injector');

/**
 * @Provider('command')
 */
module.exports = class CommandProvider extends Provider {

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
      const command = parsers[index].getDefinitions(CommandAnnotation, 0);
      const names = command.value;

      this._register[names[0]] = new Data({
        names: names,
        file: parsers[index].getPath(),
        annotation: command.getData(),
      });
      Injector.scan(parsers[index], this._register[names[0]]);
    }
  }

  getBaseName(name) {
    for (const index in this._register) {
      if (this._register[index].get('names').indexOf(name) !== -1) return index;
    }
  }

  getData(string) {
    return this._register[this.getBaseName(string)];
  }

  provide(string) {
    return this.invoke(string, this.getData(string));
  }

  invoke(string, data) {
    if (!data) return null;

    let subject = require(data.get('file'));
    subject = new subject(string, data.get('names'), data.get('annotation'), this._booter);
    Injector.injecting(subject, data);
    return subject;
  }

}
