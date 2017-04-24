'use strict';

const path = require('path');

/**
 * @Service(
 *   value = 'simplify',
 *   description = 'Format string output.'
 * )
 *
 * @Inject('helper.module')
 */
module.exports = class Symplify {

  inject(modHelper) {
    this._modHelper = modHelper;
  }

  path(...args) {
    const norm = path.join.apply(path, args);
    const mod = this._modHelper.getModOfFile(norm);

    return mod.name() + norm.substring(mod.getBase().length);
  }

}
