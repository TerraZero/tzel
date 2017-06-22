'use strict';

const Provider = use('core/Provider');
const Data = use('core/Data');
const Template = use('theme/src/Template');
const File = use('file/File');

/**
 * @Provider('template')
 */
module.exports = class TemplateProvider extends Provider {

  startRegister(booter) {
    const compiled = new File('theme::compiled');
    if (!compiled.exists()) return;

    const listed = compiled.list();

    for (const index in listed) {
      const key = listed[index].data('name');

      this._register[key] = new Data({
        key: key,
        file: listed[index].path(),
      });
    }
  }

  invoke(string, data) {
    return new Template(data);
  }

}
