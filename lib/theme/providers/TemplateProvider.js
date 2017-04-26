'use strict';

const fs = require('graceful-fs');

const Provider = use('core/Provider');
const Data = use('core/Data');
const Template = use('theme/src/Template');

/**
 * @Provider('template')
 */
module.exports = class TemplateProvider extends Provider {

  startRegister(booter) {
    return;
    const source = base('temp/theme/compiled');
    const files = fs.readdirSync(source);

    for (const index in files) {
      const key = files[index].substring(0, files[index].length - 3);

      this._register[key] = new Data({
        key: key,
        file: base('temp/theme/compiled', files[index]),
      });
    }
  }

  invoke(string, data) {
    return new Template(data);
  }

}
