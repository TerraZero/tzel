'use strict';

/**
 * @Service(
 *   value = 'helper.norm',
 *   description = 'Normalize input.'
 * )
 */
module.exports = class NormalizerService {

  toArray(subject, context = null, params = []) {
    if (Array.isArray(subject)) return subject;

    if (typeof subject === 'function') {
      return this.toArray(subject.apply(context, params));
    }

    return this.toArray([subject], context, params);
  }

  toString(subject, context = null, params = [], join = ', ') {
    if (typeof subject === 'string') return subject;

    if (typeof subject === 'function') {
      return this.toString(subject.apply(context, params), context, params, join);
    }

    if (Array.isArray(subject)) {
      return this.toString(subject.join(join), context, params, join);
    }

    return this.toString(subject.toString(), context, params, join);
  }

}
