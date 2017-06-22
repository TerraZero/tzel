'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');

const DBDriver = use('db/annotations/DBDriver');

/**
 * @Provider('dbdriver')
 */
module.exports = class FieldTypeProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(DBDriver);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const table = parser.getDefinitions(DBDriver, 0);

    data.set('key', table.value);
    data.set('annotation', table.getData());
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(data);
  }

}
