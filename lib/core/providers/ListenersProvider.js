'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const Listener = use('core/annotations/events/Listener');
const FunctionContainer = use('core/src/FunctionContainer');
const Injector = use('service/Injector');

/**
 * @Provider('listeners')
 */
module.exports = class ListenersProvider extends Provider {

  startRegister(booter) {
    this._listener = {};
    const mods = booter.getMods();

    for (const index in mods) {
      this.registerMods(mods[index]);
    }
  }

  getRegisterData(key) {
    if (this._register[key] === undefined) {
      this._register[key] = new Data({
        key: key,
      });
    }
    return this._register[key];
  }

  registerMods(mod) {
    const parsers = this.getParsers(mod);

    for (const index in parsers) {
      const listeners = parsers[index].get(Listener.METHOD, Listener);
      const inject = new Data();

      Injector.scan(parsers[index], inject);

      for (const i in listeners) {
        const data = this.getRegisterData(listeners[i].value);

        data.add('collection', {
          file: parsers[index].getPath(),
          target: listeners[i].target,
          injects: inject.get('injects'),
        });
      }
    }
  }

  getParsers(mod) {
    return mod.get(Listener, Listener.METHOD);
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
      container.add(subject[collection[index].target], subject);
    }
    return container;
  }

}
