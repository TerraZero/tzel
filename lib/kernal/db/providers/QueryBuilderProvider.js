'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');

const QueryBuilder = use('db/annotations/QueryBuilder');

const Injector = use('service/Injector');

/**
 * @Provider('querybuilder')
 */
module.exports = class QueryBuilderProvider extends Provider {

  constructor(parser, mod, path) {
    super(parser, mod, path);

    this._subjects = {};
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
      const querybuilders = parsers[index].get(QueryBuilder.METHOD, QueryBuilder);

      for (const i in querybuilders) {
        const data = new Data();

        Injector.scan(parsers[index], data);

        data.set('key', querybuilders[i].value);
        data.set('target', querybuilders[i].target);
        data.set('file', parsers[index].getPath());

        this._register[key] = data;
      }
    }
  }

  getParsers(mod) {
    return mod.get(QueryBuilder, QueryBuilder.METHOD);
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
    const container = new FunctionContainer();
    if (!data) return container;
    const collection = data.get('collection');

    for (const index in collection) {
      let subject = this._listener[collection[index].file];
      // if listener are unknown than inject new listener
      if (subject === undefined) {
        const injects = new Data({
          injects: collection[index].injects,
        });
        subject = new (require(collection[index].file))();

        Injector.injecting(subject, injects);
        this._listener[collection[index].file] = subject;
      }
      container.add(subject[collection[index].target], subject, collection[index].annotation);
    }
    container.functions().sort(function (a, b) {
      return a.meta.weight - b.meta.weight;
    });
    return container;
  }

}
