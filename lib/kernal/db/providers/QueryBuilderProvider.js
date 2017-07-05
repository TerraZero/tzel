'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const Callable = use('core/src/Callable');

const QueryBuilderAnnotation = use('db/annotations/QueryBuilder');
const QueryBuilder = use('db/src/QueryBuilder');

const Injector = use('service/Injector');

/**
 * @Provide('querybuilder')
 */
module.exports = class QueryBuilderProvider extends Provider {

  constructor(parser, mod, path) {
    super(parser, mod, path);

    this._contexts = {};
  }

  startRegister(booter) {
    const mods = booter.getMods();

    for (const index in mods) {
      this.registerMods(mods[index]);
    }
  }

  registerMods(mod) {
    const parsers = this.getParsers(mod);

    for (const index in parsers) {
      const querybuilders = parsers[index].get(QueryBuilderAnnotation.METHOD, QueryBuilderAnnotation);

      for (const i in querybuilders) {
        const data = new Data();

        Injector.scan(parsers[index], data);

        data.set('key', querybuilders[i].value);
        data.set('context', querybuilders[i].context);
        data.set('target', querybuilders[i].target);
        data.set('file', parsers[index].getPath());

        this._register[querybuilders[i].value] = data;
      }
    }
  }

  getParsers(mod) {
    return mod.get(QueryBuilderAnnotation, QueryBuilderAnnotation.METHOD);
  }

  provide(string) {
    if (!this._cache[string]) {
      this._cache[string] = this.invoke(string, this.getData(string));
    }
    return this._cache[string];
  }

  /**
   * @param {srting} string
   * @param {Data} data
   * @returns {object}
   */
  invoke(string, data) {
    let context = this._contexts[data.get('file')];

    if (context === undefined) {
      context = new (require(data.get('file')))();
      Injector.injecting(context, data);
    }

    const callable = Callable.fromContext(context, data.get('target'));
    const subject = new QueryBuilder(string, callable, data.get('context'));

    // Make recusion possible
    this._cache[string] = subject;
    return subject;
  }

}
