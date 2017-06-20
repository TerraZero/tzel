'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const DBTable = use('db/annotations/DBTable');
const Injector = use('service/Injector');

/**
 * @Provider('dbtable')
 */
module.exports = class DBTableProvider extends Provider {

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
      const tables = parsers[index].get(DBTable.METHOD, DBTable);
      if (!tables) continue;

      const inject = new Data();
      Injector.scan(parsers[index], inject);

      for (const i in tables) {
        for (const v in tables[i].value) {
          const data = this.getRegisterData(tables[i].value[v]);
          const files = data.get('files', {});

          if (!files[parsers[index].getPath()]) {
            files[parsers[index].getPath()] = {
              file: parsers[index].getPath(),
              injects: inject.get('injects'),
            };

            data.set('files', files);
          }
          data.add('collection', {
            file: parsers[index].getPath(),
            target: tables[i].target,
            annotation: tables[i].getData(),
          });
        }
      }
    }
  }

  getParsers(mod) {
    return mod.get(DBTable, DBTable.METHOD);
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
    if (!data) return null;
    const files = data.get('files');
    const collection = data.get('collection');
    const subjects = {};

    for (const index in files) {
      subjects[index] = new (require(files[index].file))();
      Injector.injectingArray(subjects[index], files[index].injects);
    }

    return {
      subjects: subjects,
      collection: collection,
    };
  }

}
