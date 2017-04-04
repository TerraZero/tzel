'use strict';

const path = require('path');

/**
 * @Service('simplify')
 * 
 * @Inject('helper.module')
 */
module.exports = class SymplifyService {

  inject(modHelper) {
    this._modHelper = modHelper;
  }

  path(...args) {
    const norm = path.join.apply(path, args);
    const mod = this._modHelper.getModOfFile(norm);

    return mod.name() + norm.substring(mod.getBase().length);
  }

}
