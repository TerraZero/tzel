'use strict';

const CallableCollection = use('core/CallableCollection');
const Callable = use('core/Callable');
const Pattern = use('core/Pattern');

/**
 * @Service('handler.listener')
 */
module.exports = class ListenerHandler {

  constructor() {
    this._cache = {};
  }

  /**
   * @Inject('boot')
   */
  inject(boot) {
    this._boot = boot;
  }

  getCallable(event) {
    const pattern = event.pattern();
    const args = event.args();
    const key = pattern.getKey(args);
    if (this._cache[key] !== undefined) return this._cache[key];

    const collection = new CallableCollection();
    const classes = this._boot.getClassesFromProvider('listeners');
    const triggers = pattern.generateAll(args);

    for (const index in classes) {
      for (const l in classes[index].listeners) {
        const listener = classes[index].listeners[l];

        if (listener.pattern !== null) {
          const match = new Pattern(listener.pattern).matchOne(triggers);

          if (match !== null) {
            this.addCallable(collection, classes[index], listener, [event, match]);
          }
        } else if (triggers.indexOf(classes[index].listeners[l].key) !== -1) {
          this.addCallable(collection, classes[index], listener, [event]);
        }
      }
    }
    this._cache[key] = collection;
    return this._cache[key];
  }

  addCallable(collection, cdata, listener, params) {
    const subject = this._boot.getSubject(cdata);
    const context = new subject();

    collection.add(Callable.fromContext(context, listener.target, { params: params, listener: listener }));
  }

}
