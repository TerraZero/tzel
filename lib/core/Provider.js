'use strict';

const ProviderAnnotation = use('core/annotations/Provider');
const Data = use('core/Data');

/**
 * @interface
 */
module.exports = class Provider {

  constructor(parser) {
    const definition = parser.getDefinitions(ProviderAnnotation, 0);

    this._protocol = definition.value;
    this._register = {};
    this._cache = {};
  }

  /**
   * The protocol name for this Provider
   * @return {string}
   */
  protocol() {
    return this._protocol;
  }

  register() {
    return this._register;
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
      if (this.accept(parsers[index])) {
        const data = new Data({
          file: parsers[index].getPath(),
        });

        this.prepare(data, parsers[index]);
        this._register[data.get('key')] = data;
      }
    }
  }

  getParsers(mod) {
    return mod.getParsers();
  }

  /**
   * @abstract
   * @param {Parser} parser
   * @returns {boolean}
   */
  accept(parser) {
    return false;
  }

  /**
   * @abstract
   * @param {Data} data
   * @param {Parser} parser
   */
  prepare(data, parser) { }

  provide(string) {
    if (!this._cache[string]) {
      this._cache[string] = this.invoke(string, this._register[string]);
    }
    return this._cache[string];
  }

  /**
   * @abstract
   * @param {srting} string
   * @param {Data} data
   * @returns {object}
   */
  invoke(string, data) {
    return require(data.get('file'));
  }

}
