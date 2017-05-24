'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');

const Tags = use('core/annotations/Tags');
const Service = use('service/annotations/Service');

/**
 * @Provider(
 *   value='service',
 *   weight=-1000
 * )
 */
module.exports = class ServiceProvider extends InjectorProviderBase {

  startRegister(booter) {
    super.startRegister(booter);
    this._booter = booter;
  }

  getParsers(mod) {
    return mod.get(Service);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const service = parser.getDefinitions(Service, 0);
    const tags = parser.getDefinitions(Tags, 0);

    if (tags) {
      data.set('tags', tags);
    }
    data.set('key', service.value);
    data.set('annotation', service.getData());
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(this._booter);
  }

}
