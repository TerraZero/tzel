'use strict';

const path = require('path');

/**
 * @Service(
 *   value = 'manager.file',
 *   description = 'Managed the file handling.'
 * )
 */
module.exports = class FileManager {

  constructor(booter) {
    this._settings = booter.getSettings().files;
    this._mods = booter.getMods();
    this._settings.storages['root'] = base();
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
    if (storage.startsWith('mod/')) {
      return this.getModuleRoot(storage.split('/')[1]);
    }
    const root = this._settings.storages[storage];

    if (path.isAbsolute(root)) {
      return root;
    } else {
      return base(root);
    }
  }

  getModuleRoot(mod) {
    return this._mods[mod].getPath(mod);
  }

}
