'use strict';

/**
 * @Service(
 *   value = 'helper.norm',
 *   description = 'Normalize input.'
 * )
 */
module.exports = class NormalizerService {

  /**
   * @Inject('manager.file')
   */
  inject(fs) {
    this._fs = fs;
  }

  label(type) {
    switch (type) {
      case 'any':
        return 'Any';
      case 'number':
        return 'Number';
      case 'int':
        return 'Integer';
      case 'function':
        return 'Function';
      case 'empty':
        return 'Empty';
      case 'array':
        return 'Array';
      case 'string':
        return 'String';
      case 'file':
        return 'File';
      case 'bool':
        return 'Boolean';
      case 'object':
        return 'Plain Object';
    }
    return 'Unknown';
  }

  is(type, subject) {
    switch (type) {
      case 'any':
        return true;
      case 'number':
        return this.isNumber(subject);
      case 'int':
        return this.isInt(subject);
      case 'function':
        return this.isFunction(subject);
      case 'empty':
        return this.isEmpty(subject);
      case 'array':
        return this.isArray(subject);
      case 'string':
        return this.isString(subject);
      case 'file':
        return this.isFile(subject);
      case 'bool':
        return this.isBool(subject);
      case 'object':
        return this.isObject(subject);
    }
    /** @TODO exception for no type definition */
    return false;
  }

  isFunction(subject) {
    return typeof subject === 'function';
  }

  isString(subject) {
    return typeof subject === 'string';
  }

  isArray(subject) {
    return Array.isArray(subject);
  }

  isFile(subject) {
    return this._fs.isFile(subject);
  }

  isBool(subject) {
    return typeof subject === 'boolean';
  }

  isNumber(subject) {
    return typeof subject === 'number';
  }

  isInt(subject) {
    return Number.isInteger(subject);
  }

  isEmpty(subject) {
    if (!subject) return true;
    if (this.isArray(subject) && !subject.length) return true;

    return false;
  }

  isObject(object) {
    return !!object && object.constructor === Object;
  }

  to(type, params = []) {
    switch (type) {
      case 'array':
        return this.toArray.apply(this, params);
      case 'string':
        return this.toString.apply(this, params);
      case 'file':
        return this.toFile.apply(this, params);
      case 'bool':
        return this.toBool.apply(this, params);
    }
    /** @TODO exception for no type definition */
    return null;
  }

  toArray(subject, context = null, params = []) {
    if (this.isArray(subject)) return subject;

    if (this.isFunction(subject)) {
      return this.toArray(subject.apply(context, params));
    }

    if (this.isEmpty(subject)) return null;

    return this.toArray([subject], context, params);
  }

  toString(subject, context = null, params = [], join = ', ') {
    if (this.isString(subject)) return subject;

    if (this.isFunction(subject)) {
      return this.toString(subject.apply(context, params), context, params, join);
    }

    if (this.isArray(subject)) {
      return this.toString(subject.join(join), context, params, join);
    }

    if (this.isEmpty(subject)) return null;

    if (this.isFunction(subject.toString)) {
      return this.toString(subject.toString(), context, params, join);
    }

    return null;
  }

  toFile(subject, context = null, params = []) {
    const file = this._fs.getFile(subject);

    if (file !== null) return file;

    if (this.isFunction(subject)) {
      return this.toFile(subject.apply(context, params));
    }
    return null;
  }

  toBool(subject, context = null, params = []) {
    if (this.isBool(subject)) return subject;

    if (this.isFunction(subject)) {
      return this.toBool(subject.apply(context, params));
    }

    if (this.isEmpty(subject)) return false;

    return null;
  }

  toOptions(options, definition, params = []) {
    const norm = {};

    for (const index in definition) {
      if (definition[index].type === 'any') {
        if (options[index] !== undefined) {
          if (this.isFunction(options[index])) {
            const _params = params.slice();

            norm[index] = options[index].apply(_params.shift(), _params);
          } else {
            norm[index] = options[index];
          }
        } else {
          norm[index] = definition[index].fallback || null;
        }
        continue;
      }
      const _params = params.slice();
      _params.unshift(options[index]);

      norm[index] = this.to(definition[index].type, _params);
      if (this.isEmpty(norm[index])) {
        if (definition[index].fallback !== undefined) {
          norm[index] = definition[index].fallback;
        } else {
          norm[index] = null;
        }
      }
    }
    return norm;
  }

  filter(type, array) {
    const filtered = [];

    for (const index in array) {
      if (this.is(type, array[index])) {
        filtered.push(array[index]);
      }
    }
    return filtered;
  }

}
