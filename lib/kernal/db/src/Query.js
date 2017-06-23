'use strict';

const Callable = use('core/src/Callable');

module.exports = class Query {

  constructor(name, context) {
    this._name = name;
    this._context = context;

    this._callables = {};
    this._queries = [];
    this._compiled = false;
    this._placeholders = {};
  }

  name() {
    return this._name;
  }

  context() {
    return this._context;
  }

  queries() {
    return this._queries;
  }

  addFunc(name, callable) {
    this._callables[name] = Callable.create(callable);
    return this;
  }

  addQuery(query) {
    if (this.isCompiled()) use('exception::db.query.build').setType(1).setQuery(this).throw();
    this._queries.push(query);
    return this;
  }

  isCompiled() {
    return this._compiled;
  }

  compile() {
    if (this.isCompiled()) return this;

    const queries = this.queries();

    for (const index in queries) {
      queries[index] = queries[index].toQuery();
      this._placeholders[index] = {};
      for (const value in queries[index].values) {
        const name = this.getPlaceholder(queries[index].values[value]);

        if (name !== null) {
          if (this._placeholders[index][name] === undefined) {
            this._placeholders[index][name] = [];
          }
          this._placeholders[index][name].push(value);
        }
      }
    }

    this._compiled = true;
    return this;
  }

  build(args = {}) {
    this.compile();
    const builds = [];
    const queries = this.queries();

    for (const query in queries) {
      const values = queries[query].values.slice();
      const placeholders = this._placeholders[query];

      for (const name in placeholders) {
        const value = this.getPlaceholderValue(name, args);

        for (const index in placeholders[name]) {
          values[placeholders[name][index]] = value;
        }
      }
      builds.push({
        text: queries[query].text,
        values: values,
      });
    }
    return builds;
  }

  getPlaceholderValue(name, args) {
    if (args[name] !== undefined) return args[name];
    if (this._callables[name] !== undefined) {
      const value = this._callables[name].call(args, name);
      if (value) return value;
    }
    use('exception::db.query.build').setArgs(name).setQuery(this).throw();
  }

  getPlaceholder(value) {
    if (typeof value === 'string' && value.startsWith('::')) {
      return value.substring(2);
    }
    return null;
  }

}
