'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');

const EntityType = use('entity/annotations/EntityType');

/**
 * @Provider('entity')
 *
 * @Inject('helper.norm')
 */
module.exports = class EntityTypeProvider extends InjectorProviderBase {

  inject(norm) {
    this._norm = norm;
  }

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
    const subject = new (require(data.get('file')))(data, this._norm);

    // Make recusion possible
    this._cache[string] = subject;
    Injector.injecting(subject, data);
    subject.init();
    return subject;
  }

}
