'use strict';

const Provider = use('core/Provider');
const Service = use('service/annotations/Service');
const Inject = use('service/annotations/Inject');

/**
 * @Provider(
 *   value='service',
 *   weight=-1000
 * )
 */
module.exports = class ServiceProvider extends Provider.class {

  scan(parser, data) {
    const service = parser.getDefinitions(Service.class, 0);
    const injects = parser.getDefinitions(Inject.class);
    if (!service && !injects) return;

    data.add('providers', this.provider());

    if (service) {
      data.set('creator', this.provider());
      data.add('keys', 'service::' + service.value);
    }

    if (injects) {
      for (const index in injects) {
        data.add('injects', injects[index].value);
      }
    }
  }

  provide(subject, data, object) {
    if (data.injects !== undefined) {
      const injects = [];

      for (const index in data.injects) {
        if (data.injects[index].split('::').length === 1) {
          injects.push(use('service::' + data.injects[index]));
        } else {
          injects.push(use(data.injects[index]));
        }
      }
      if (typeof object.inject === 'function') {
        object.inject.apply(object, injects);
      }
    }
    return object;
  }

}
