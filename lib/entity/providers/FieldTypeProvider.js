'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');

const FieldType = use('entity/annotations/FieldType');

/**
 * @Provider('field')
 */
module.exports = class FieldTypeProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(FieldType);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const type = parser.getDefinitions(FieldType, 0);

    data.set('key', type.value);
    data.set('annotation', type.getData());
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(data);
  }

}
