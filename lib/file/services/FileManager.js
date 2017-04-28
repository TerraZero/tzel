'use strict';

const fs = require('graceful-fs');
const path = require('path');

const File = use('file/File');

/**
 * @Service(
 *   value = 'manager.file',
 *   description = 'Managed the file handling.'
 * )
 *
 * @Inject('helper.module')
 */
module.exports = class FileManager {

  constructor(booter) {
    this._settings = booter.getSettings().files;
    this._mods = booter.getMods();
    this._settings.storages['root'] = base();
    this._root = base();
    this._BUFFER_SIZE = 64 * 1024;
  }

  setBuffer(size) {
    this._BUFFER_SIZE = size;
  }

  getBuffer() {
    return this._BUFFER_SIZE;
  }

  inject(helper) {
    this._helper = helper;
  }

  getFile(file) {
    if (file instanceof File) {
      return file;
    }
    if (typeof file === 'string') {
      return new File(file);
    }
    if (Array.isArray(file)) {
      return new File(this.format(this.normalize(file)));
    }
    return null;
  }

  resolve(file) {
    return path.format(file);
  }

  normalize(parts) {
    const norm = path.normalize(path.join.apply(path, parts));
    const parsed = path.parse(norm);

    parsed.external = false;
    parsed.storage = null;
    parsed.storageRoot = '';
    parsed.storageFile = '';

    if (path.isAbsolute(norm)) {
      // if path is not in root is is a external path
      if (!norm.startsWith(this._root)) {
        return this.normalize(['external::' + norm]);
      }

      const mod = this._helper.getModOfFile(norm);

      if (mod === null) {
        // try to resolve the storage
        for (const storage in this._settings.storages) {
          const storagePath = path.join(this._root, this._settings.storages[storage]);

          if (norm.startsWith(storagePath)) {
            // found the right storage
            return this.normalize([storage + '::' + norm.substring(storagePath.length + 1)]);
          }
        }
        // no storage found and no module found but its in the root
        return this.normalize(['root::' + norm.substring(this._root.length + 1)]);
      } else {
        return this.normalize(['mod.' + mod.name() + '::' + norm.substring(this.getModuleRoot(mod.name()).length)]);
      }
    } else {
      const target = norm.split('::');

      if (target.length === 1) {
        parsed.dir = 'root::' + parsed.dir;
        target.unshift('root');
      }

      parsed.storage = target[0];
      parsed.storageRoot = this.getStorageRoot(target[0]);
      parsed.storageFile = target[1];
      if (parsed.storage === 'external') {
        parsed.external = true;
      }
    }
    return parsed;
  }

  format(file) {
    return path.normalize(path.join(file.storageRoot, file.storageFile));
  }

  getStorageRoot(storage) {
    if (storage === 'external') {
      return '';
    }
    if (storage.startsWith('mod.')) {
      return this.getModuleRoot(storage.split('.')[1]);
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

  copy(from, to) {
    const buffer = new Buffer(this._BUFFER_SIZE);
    const reader = fs.openSync(from, 'r');
    const writer = fs.openSync(to, 'w');

    let bytesRead = 1;
    let pos = 0;
    while (bytesRead > 0) {
      bytesRead = fs.readSync(reader, buffer, 0, this._BUFFER_SIZE, pos);
      fs.writeSync(writer, buffer, 0, bytesRead);
      pos += bytesRead;
    }

    fs.closeSync(reader);
    fs.closeSync(writer);
  }

  list(file) {
    file = this.getFile(file);
    return fs.readdirSync(file.path());
  }

}
