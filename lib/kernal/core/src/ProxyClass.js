'use strict';

module.exports = function ProxyClass(string) {
  return new Proxy(function () { }, {

    getClass: function (target) {
      if (target.class === undefined) {
        target.class = use(string);
      }
      return target.class;
    },

    construct: function (target, argumentsList, newTarget) {
      const subject = this.getClass(target);

      return Reflect.construct(subject, argumentsList, subject);
    },

    get: function (target, property, receiver) {
      const subject = this.getClass(target);

      if (property === 'class') return subject;
      return subject[property];
    },

    set: function (target, property, value, receiver) {
      const subject = this.getClass(target);

      subject[property] = value;
      return true;
    },

  });
};
