'use strict';

const Provider = use('boot/Provider');
const Listener = use('core/annotations/Listener');

/**
 * @Provider('listeners')
 */
module.exports = class ListenersProvider extends Provider.class {

  scan(parser, data) {
    const listeners = parser.get(Listener.METHOD, Listener);

    if (!listeners) return false;

    data.add('providers', this.provider());

    for (const index in listeners) {
      data.add('listeners', {
        target: listeners[index].target,
        weight: listeners[index].weight,
        key: listeners[index].value,
      });
    }
    return true;
  }

}
