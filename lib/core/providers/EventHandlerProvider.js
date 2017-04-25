'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const Injector = use('service/Injector');

const Handler = use('core/annotations/events/Handler');
const Event = use('core/annotations/events/Event');

/**
 * @Provider('handler')
 */
module.exports = class EventHandlerProvider extends Provider {

  getParsers(mod) {
    return mod.get(Handler);
  }

  registerMods(mod) {
    const parsers = this.getParsers(mod);

    for (const index in parsers) {
      const handler = parsers[index].getDefinitions(Handler, 0);
      const events = parsers[index].getMethods(Event);
      const names = [handler.value];

      for (const i in events) {
        names.push(events[i].value);
      }

      this._register[handler.value] = new Data({
        names: names,
        file: parsers[index].getPath(),
        annotation: handler,
        events: events,
      });
      Injector.scan(parsers[index], this._register[handler.value]);
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

  invoke(string, data) {
    if (!data) return null;

    let subject = require(data.get('file'));
    subject = new subject();
    Injector.injecting(subject, data);
    return subject;
  }

}
