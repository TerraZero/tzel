'use strict';

const CallableCollection = use('core/CallableCollection');
const Callable = use('core/Callable');

/**
 * @Service('handler.listener')
 */
module.exports = class ListenerHandler {

  constructor() {
    this._cache = {};
  }

  /**
   * @Inject('helper.boot')
   */
  inject(boot) {
    this._boot = boot;
  }

  getCallable(listener) {
    if (this._cache[listener] !== undefined) return this._cache[listener];

    const collection = new CallableCollection();
    const classes = this._boot.getClassesFromProvider('listeners');

    for (const index in classes) {
      for (const l in classes[index].listeners) {
        if (classes[index].listeners[l].key === listener) {
          const context = new (use(classes[index].mod + '/' + classes[index].keys[0]))();

          collection.add(Callable.fromContext(context, classes[index].listeners[l].target))
        }
      }
    }
    this._cache[listener] = collection;
    return this._cache[listener];
  }

}
