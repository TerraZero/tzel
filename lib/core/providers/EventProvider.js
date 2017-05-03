'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');
const Event = use('core/annotations/events/Event');

/**
 * @Provider('event')
 */
module.exports = class EventProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(Event);
  }

  accept(parser) {
    return true;
  }

  provide(string) {
    return this.invoke(string, this.getData(string));
  }

  invoke(string, data) {
    const subject = this.createSubject(string, data);

    Injector.injecting(subject, data);
    return subject;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const event = parser.getDefinitions(Event, 0);

    data.set('key', event.value);
    data.set('annotation', event.getData());
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(string);
  }

}
