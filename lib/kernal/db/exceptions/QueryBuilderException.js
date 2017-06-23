'use strict';

const Exception = use('core/Exception');

/**
 * @Exception('db.query.build')
 */
module.exports = class QueryBuilderException extends Exception {

  init() {
    super.init();
    this.setType(0);

    this._query = null;
  }

  setQuery(query) {
    this._query = query;
    return this;
  }

  setType(type) {
    this.setMessage(this.types()[type]);
    return this;
  }

  types() {
    return [
      'The query [query] im context [context] can not build placeholder [0]',
      'The query [query] im context [context] is already compiled',
    ];
  }

  query() {
    return this._query;
  }

  placeholders() {
    return {
      query: this.getQueryName,
      context: this.getContextName,
    };
  }

  getQueryName() {
    return this.query().name();
  }

  getContextName() {
    return this.query().context();
  }

}
