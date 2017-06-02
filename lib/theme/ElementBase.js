'use strict';

/**
 * @Base('element')
 */
module.exports = class ElementBase {

  constructor(data) {
    this._type = data.get('key');
  }

  type() {
    return this._type;
  }

  define() {
    return {
      template: this._type,
    };
  }

  render(element) {

  }

}
