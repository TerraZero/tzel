'use strict';

const InjectorProviderBase = use('service/providers/InjectorProviderBase');
const Injector = use('service/Injector');

const Exception = use('core/annotations/Exception');

/**
 * @Provide(
 *   value='exception',
 *   weight=-900
 * )
 */
module.exports = class ExceptionProvider extends InjectorProviderBase {

  getParsers(mod) {
    return mod.get(Exception);
  }

  accept(parser) {
    return true;
  }

  prepare(data, parser) {
    super.prepare(data, parser);
    const exception = parser.getDefinitions(Exception, 0);

    data.set('key', exception.value);
    data.set('annotation', exception.getData());
  }

  provide(string) {
    return this.invoke(string, this.getData(string));
  }

  invoke(string, data) {
    const subject = this.createSubject(string, data);

    Injector.injecting(subject, data);
    if (typeof subject.init === 'function') {
      subject.init.call(subject);
    }
    return subject;
  }

  createSubject(string, data) {
    return new (require(data.get('file')))(data);
  }

}
