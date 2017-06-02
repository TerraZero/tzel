'use strict';

module.exports = class Element {

  constructor(type, args = {}) {
    this._element = use('element::' + type);
    this._args = this.element().define();
    this._render = null;

    this.args(args);
  }

  element() {
    return this._element;
  }

  type() {
    return this.element().type();
  }

  set(name, value) {
    this._args[name] = value;
    return this;
  }

  get(name) {
    return this._args[name];
  }

  args(values) {
    if (values === undefined) return this._args;

    for (const index in values) {
      this.set(index, values[index]);
    }
    return this;
  }

  render() {
    if (this._render) {
      this._render = this.element().render(this);
    }
    return this._render;
  }

}
