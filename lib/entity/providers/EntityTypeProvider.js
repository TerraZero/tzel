'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');

const EntityType = use('entity/annotations/EntityType');

/**
 * @Provider('etype')
 */
module.exports = class EntityTypeProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(EntityType);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const type = parser.getDefinitions(EntityType, 0);

    data.set('key', type.value);
    data.set('annotation', type.getData());
  }

  invoke(string, data) {
    const subject = new (require(data.get('file')))(data);

    // Make recusion possible
    this._cache[string] = subject;
    Injector.injecting(subject, data);
    subject.init();
    return subject;
  }

}
