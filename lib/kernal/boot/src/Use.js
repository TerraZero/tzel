'use strict';

module.exports = class Use {

  constructor(boot) {
    const that = this;
    this._boot = null;

    global.use = function use(string) {
      return that.create(string);
    };
    global.use.cache = {};
  }

  setBoot(boot) {
    this._boot = boot;
    global.use.boot = boot;
  }

  getBoot() {
    return this._boot;
  }

  create(string) {
    if (string.startsWith('#')) return this.getProxy(string.substring(1), true);
    if (use.cache[string] !== undefined) return use.cache[string];

    use.cache[string] = this.getProxy(string);

    return use.cache[string];
  }

  getProxy(string, cachable = false) {
    const that = this;
    const data = {
      cachable: cachable,
    };

    return new Proxy(function () { }, {

      getData: function () {
        if (data.data === undefined) {
          data.data = that.getBoot().getData(string);
        }
        return data.data;
      },

      getClass: function () {
        if (data.class === undefined) {
          data.class = require(this.getData().file);
          if (typeof data.class.init === 'function') {
            data.class.init();
          }
        }
        return data.class;
      },

      getSubject: function () {
        if (data.subject === undefined) {
          data.subject = that.getBoot().provide(this.getClass(), this.getData());
        }
        return data.subject;
      },

      construct: function (target, argumentsList, newTarget) {
        const data = this.getData();

        if (data.providers === undefined) {
          return Reflect.construct(this.getClass(), argumentsList, this.getClass());
        }
        return that.getBoot().provide(this.getClass(), data, argumentsList);
      },

      get: function (target, property, receiver) {
        if (property === 'class') return this.getClass();
        if (property === '__use') return string;
        if (property === '__data') return this.getData();
        if (property === '__file') return this.getData().file;
        if (property === '__id') return this.getData().id;
        if (property === '__cache') return data.cachable;

        return this.getSubject()[property];
      },

      set: function (target, property, value, receiver) {
        this.getSubject()[property] = value;
        return true;
      },

    });
  }

}
