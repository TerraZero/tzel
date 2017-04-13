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

  resolve(file) {
    return path.format(file);
  }

  normalize(parts) {
    const norm = path.normalize(path.join.apply(path, parts));
    const parsed = path.parse(norm);

    parsed.absolute = path.isAbsolute(norm);
    parsed.storage = null;
    parsed.storageRoot = null;
    parsed.storageDir = null;

    if (!parsed.absolute) {
      const target = parsed.dir.split('::');

      if (target.length === 1) return this.normalize(base(norm));

      parsed.storage = target[0];
      parsed.storageRoot = this.getStorageRoot(target[0]);
      parsed.storageDir = target[1];
    }
    return parsed;
  }

  format(file) {
    if (file.absolute) {
      return path.format(file);
    } else {
      return path.normalize(path.join(file.storageRoot, file.storageDir, file.base));
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
