'use strict';

const Provider = use('boot/Provider');

/**
 * @interface
 */
module.exports = class SimpleProvider extends Provider.class {

  getAnnotation() {
    return null;
  }

  scanning(parser, data, annotation) { }

  scan(parser, data) {
    const annotation = parser.getDefinitions(this.getAnnotation(), 0);

    if (!annotation) return false;

    data.add('providers', this.provider());

    data.set('creator', this.provider());
    data.add('keys', this.provider() + '::' + annotation.value);
    this.scanning(parser, data, annotation);
    return true;
  }

  create(subject, data, args) {
    return Reflect.construct(subject, [data], subject);
  }

}
