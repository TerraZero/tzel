'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Element = use('theme/annotations/Element');

/**
 * @Provider('element')
 */
module.exports = class ElementProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(Element);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const element = parser.getDefinitions(Element, 0);

    data.set('key', element.value);
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(data);
  }

}
