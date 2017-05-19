'use strict';

/**
 * @Service(
 *   value = 'replacer.command',
 *   description = 'Gives replacer functions.'
 * )
 */
module.exports = class CommandReplacer {

  defaultReplacer(definition) {
    return this._norm.toString(this.getValue(definition.key), null, null, ', ');
  }

  buildClassName(parts) {
    let name = '';

    for (let index = parts.length - 1; index >= 0; index--) {
      name += parts[index].substring(0, 1).toUpperCase() + parts[index].substring(1);
    }
    return name;
  }

  getServiceClass(field, append = '', spliter = '.') {
    const funcName = this.buildClassName;

    return function () {
      const value = this.getValue(field);

      return funcName(value.split(spliter)) + append;
    };
  }

  getClassName(field, append = '', spliter = '.') {
    return function () {
      const value = this.getValue(field);
      const parts = value.split(spliter);
      let name = '';

      for (const index in parts) {
        name += parts[index].substring(0, 1).toUpperCase() + parts[index].substring(1);
      }
      return name + append;
    };
  }

  getServiceName(field, type) {
    return function () {
      return type + '.' + this.getValue(field);
    };
  }

  getCommandName(field, type) {
    return function () {
      return type + ':' + this.getValue(field);
    };
  }

  getServiceFunction(field) {
    return function () {
      const value = this.getValue(field).slice();

      if (!value.length) return '';

      for (const index in value) {
        const parts = value[index].split('.');

        value[index] = parts[parts.length - 1];
      }
      const output = ['', '  inject(' + value.join(', ') + ') {'];

      for (const index in value) {
        output.push('    this._' + value[index] + ' = ' + value[index] + ';');
      }
      output.push('  }');
      output.push('');
      return output.join('\n');
    };
  }

  getServiceAnnotation(field) {
    return function () {
      const value = this.getValue(field);

      if (!value.length) return '';

      const output = ['', ' *'];

      for (const index in value) {
        output.push(' * @Inject(\'' + value[index] + '\')');
      }
      return output.join('\n');
    };
  }

  getBasedOnExtender(field, fallback, src) {
    return function () {
      const value = this.getValue(field);
      if (value !==)


    };
  }

}
