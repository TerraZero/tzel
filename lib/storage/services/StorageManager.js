'use strict';

const path = require('path');

/**
 * @Service(
 *   value = 'manager.storage',
 *   description = 'Managed the file handling.'
 * )
 */
module.exports = class StorageManager {

  constructor(booter) {
    this._settings = booter.getSettings().files;
  }

  normalize(parts) {
    return path.normalize(path.join.apply(path, parts));
  }

  resolve(...parts) {
    const norm = this.normalize(parts);

    if (path.isAbsolute(norm)) {
      return norm;
    } else {
      const parts = norm.split('::');

      if (parts.length === 1) return base(norm);

      parts[0] = this.getStorageRoot(parts[0]);
      return this.normalize(parts);
    }
  }

  getStorageRoot(storage) {
    const root = this._settings.storages[storage];

    if (path.isAbsolute(root)) {
      return root;
    } else {
      return base(root);
    }
  }

}
