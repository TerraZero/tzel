'use strict';

module.exports = class Use {

  constructor(boot) {
    const that = this;
    this._boot = null;

    global.use = function use(string) {
      return that.create(string);
    };
  }

  setBoot(boot) {
    this._boot = boot;
  }

  getBoot() {
    return this._boot;
  }

  create(string) {
    const that = this;
    const data = {};

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
        const subject = this.getClass();

        return Reflect.construct(subject, argumentsList, subject);
      },

      get: function (target, property, receiver) {
        if (property === 'class') return this.getClass();
        if (property === 'use') return string;
        if (property === 'file') return this.getData().file;

        return this.getSubject()[property];
      },

      set: function (target, property, value, receiver) {
        this.getSubject()[property] = value;
        return true;
      },

    });
  }

}
