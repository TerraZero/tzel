'use strict';

const SimpleProvider = use('core/SimpleProvider');
const Event = use('core/annotations/Event');

/**
 * @Provider('event')
 */
module.exports = class EventProvider extends SimpleProvider.class {

  getAnnotation() {
    return Event.class;
  }

  scanning(parser, data, annotation) {
    data.set('key', annotation.value);
  }

}
