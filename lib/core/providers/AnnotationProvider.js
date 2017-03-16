'use strict';

const Provider = use('core/Provider');

module.exports = class AnnotationProvider extends Provider {

  constructor() {
    super();
    this._boot = null;
  }

  protocol() {
    return 'annotation';
  }

  invoke(string, data) {
    return this.getBoot()._annotations[string];
  }

  getBoot() {
    if (!this._boot) {
      this._boot = load('core:boot');
    }
    return this._boot;
  }

}
