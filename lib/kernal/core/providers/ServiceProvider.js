'use strict';

const Provider = use('boot/Provider');
const Service = use('core/annotations/Service');
const Inject = use('core/annotations/Inject');

/**
 * @Provider(
 *   value='service',
 *   weight=-1000
 * )
 */
module.exports = class ServiceProvider extends Provider.class {

  scan(parser, data) {
    const service = parser.getDefinitions(Service.class, 0);
    const injects = parser.getMethods(Inject.class);
    if (!service && !injects) return false;

    data.add('providers', this.provider());

    if (service) {
      data.set('creator', this.provider());
      data.add('keys', this.provider() + '::' + service.value);
    }

    if (injects) {
      for (const index in injects) {
        data.add('injects', {
          value: injects[index].value,
          target: injects[index].target,
        });
      }
    }
    return true;
  }

  provide(subject, data, object) {
    if (data.injects !== undefined) {
      const injects = {};

      for (const index in data.injects) {
        if (injects[data.injects[index].target] === undefined) injects[data.injects[index].target] = [];

        if (data.injects[index].value.split('::').length === 1) {
          injects[data.injects[index].target].push(use('service::' + data.injects[index].value));
        } else {
          injects[data.injects[index].target].push(use(data.injects[index].value));
        }
      }

      for (const target in injects) {
        if (typeof object[target] === 'function') {
          object[target].apply(object, injects[target]);
        }
      }
    }
  }

  extend(data, extend) {
    if (extend.injects) {
      data.injects = data.injects || [];
      for (const index in extend.injects) {
        data.injects.push(extend.injects[index]);
      }
    }
  }

}
