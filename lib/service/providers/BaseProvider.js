'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');

const Injector = use('service/Injector');
const Base = use('service/annotations/Base');
const BasedOn = use('service/annotations/BasedOn');

/**
 * @Provider(
 *   value='base',
 *   weight=-2000
 * )
 */
module.exports = class BaseProvider extends Provider {

  startRegister(booter) {
    const mods = booter.getMods();

    for (const index in mods) {
      this.registerMods(mods[index]);
    }
    this.registerBasedOn();
  }

  registerMods(mod) {
    const parsers = mod.getParsers();

    for (const index in parsers) {
      const base = parsers[index].getDefinitions(Base);
      const basedon = parsers[index].getDefinitions(BasedOn);
      if (!base || !base.length) continue;

      const data = new Data({
        file: parsers[index].getPath(),
        key: base[0].value,
        base: base[0].getData(),
        basedOn: null,
      });

      if (basedon && basedon.length) {
        data.set('basedOn', basedon[0].value);
      }

      Injector.scanInjects(parsers[index], data);
      this._register[data.get('key')] = data;
    }
  }

  registerBasedOn(mod) {
    for (const index in this._register) {
      const data = this._register[index];
      this.scanBases(data, data.get('key'));
    }
  }

  scanBases(data, basedon) {
    if (!basedon) return;
    const base = this._register[basedon];
    const basing = data.get('basing') || {};

    if (base.get('injects')) {
      basing[base.get('base').inject] = base.get('injects');
      data.set('basing', basing);
    }
    this.scanBases(data, base.get('basedOn'));
  }

  provide(string) {
    if (!this._cache[string]) {
      this._cache[string] = this.getData(string).all();
    }
    return this._cache[string];
  }

}
