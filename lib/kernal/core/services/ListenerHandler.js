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

  getCallable(eventname) {
    if (this._cache[eventname] !== undefined) return this._cache[eventname];

    const collection = new CallableCollection();
    const classes = this._boot.getClassesFromProvider('listeners');

    for (const index in classes) {
      for (const l in classes[index].listeners) {
        if (classes[index].listeners[l].key === eventname) {
          const subject = use(classes[index].mod + '/' + classes[index].keys[0]);
          const context = new subject();

          collection.add(Callable.fromContext(context, classes[index].listeners[l].target, classes[index].listeners[l]));
        }
      }
    }
    this._cache[eventname] = collection;
    return this._cache[eventname];
  }

}
