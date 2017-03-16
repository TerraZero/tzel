'use strict';

const AnnotationBase = require('tzero-annotations');
const Reader = AnnotationBase.Reader;
const Annotation = use('core/Annotation');

const registry = new AnnotationBase.Registry();

module.exports = class AnnotationParser {

  static register(file) {
    registry.registerAnnotation(file);
  }

  /**
   * @param {string} path
   */
  constructor(path) {
    this._reader = new Reader(registry);
    this._path = path;

    this._reader.parse(path);
  }

  /**
   * Get annoations on file marked with {Annoation.DEFINITION}
   *
   * @param {null|number|string|Annotation} index
   * @return {null|Annoation[]}
   */
  getDefinitions(index = null) {
    return this.findAnnotations(this._reader.definitionAnnotations, index);
  }

  /**
   * Get annotations on file marked with {Annoation.METHOD}
   *
   * @param {null|number|string|Annotation} index
   * @return {null|Annoation[]}
   */
  getMethods(index = null) {
    return this.findAnnotations(this._reader.methodAnnotations, index);
  }

  /**
   * Get the annoation list filtered
   *
   * @param {Annotation[]} list
   * @param {null|number|string|Annotation} index
   * @returns {null|Annotation[]}
   */
  findAnnotations(list, index = null) {
    if (index === null) return list;

    const filter = [];
    if (typeof index === "number") {
      return list[index] || null;
    }
    if (typeof index === 'string') {
      for (const i in list) {
        if (list[i].constructor.name === index) filter.push(list[i]);
      }
    } else if (index.prototype instanceof Annotation) {
      for (const i in list) {
        if (list[i].constructor.name === index.name) filter.push(list[i]);
      }
    }
    return filter.length && filter || null;
  }

}
