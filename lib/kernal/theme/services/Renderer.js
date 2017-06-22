'use strict';

/**
 * @Service('renderer')
 */
module.exports = class Renderer {

  render(view) {
    var t = use('template::' + view.template);
    return t.generate(view);
  }

}
