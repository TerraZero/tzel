'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');

/**
 * @Provider('proxy')
 */
module.exports = class ProxyProvider extends Provider {

  startRegister(booter) {
    const providers = booter.getProviders();

    for (const protocol in providers) {
      this._register[protocol] = new Data();
    }
  }

  invoke(string, data) {
    return new Proxy(function () { }, {

      construct: function (target, argumentsList, newTarget) {
        return use(string + '::' + argumentsList[0]);
      }

    });
  }

}
