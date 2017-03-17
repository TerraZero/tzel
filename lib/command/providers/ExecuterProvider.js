'use strict';

const Provider = use('core/Provider');
const Executer = use('command/Executer');

/**
 * @Provider('executer')
 */
module.exports = class CommandProvider extends Provider {

  startRegister(booter) { }

  provide(string) {
    return new Executer(string);
  }

}
