'use strict';

const Annotation = require('tzero-annotations').Annotation;

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');
const Listener = use('core/annotations/events/Listener');

/**
 * @Provider('listener')
 */
module.exports = class ListenerProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(Listener, Annotation.METHOD);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const event = parser.getDefinitions(Event, 0);

    data.set('key', event.value);
    data.set('annotation', event);
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(string);
  }

}
