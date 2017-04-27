'use strict';

const fs = require('graceful-fs');
const path = require('path');
const mkdirs = require('mkdirs');

const Injector = use('service/Injector');

/**
 * @Inject('manager.file')
 */
module.exports = class File {

  constructor(...parts) {
    Injector.directInject(this, __filename);
    this.setFile(parts);
  }

  setFile(parts) {
    this._data = this._manager.normalize(parts);

    this._stat = null;
    this._content = null;
    this._dir = null;
    this._changed = false;
    this._loaded = false;
  }

  inject(manager) {
    this._manager = manager;
  }

  copy(target) {
    target = this._manager.getFile(target);
    this._manager.copy(this.path(), target.path());
    this.setFile(target.path());
  }

  copyTo(target) {
    target = this._manager.getFile(target);
    this._manager.copy(this.path(), target.path());
  }

  move(target) {
    const file = this._manager.getFile(target);

    fs.renameSync(this.path(), file.path());
  }

  create() {
    this.createDir().createFile();
    return this;
  }

  createDir() {
    mkdirs(this.dir());
    return this;
  }

  createFile() {
    if (!this.exists()) {
      fs.writeFileSync(this.path(), '');
    }
    return this;
  }

  delete() {
    fs.unlink(this.path());
    return this;
  }

  content(flush = false) {
    if (this._content === null || flush) {
      this._content = fs.readFileSync(this.path()).toString();
      this._loaded = true;
    }
    return this._content;
  }

  setContent(content) {
    this._content = content;
    this._changed = true;
    return this;
  }

  save(force = false) {
    if (force || this.isChanged()) {
      fs.writeFileSync(this.path(), this._content);
      this._changed = false;
    }
    return this;
  }

  exists() {
    return fs.existsSync(this.path());
  }

  existsDir() {
    return fs.existsSync(this.dir());
  }

  stat() {
    if (this._stat === null) {
      this._stat = fs.lstatSync(this.path());
    }
    return this._stat;
  }

  isDir() {
    return this.stat().isDirectory();
  }

  isFile() {
    return this.stat().isFile();
  }

  isChanged() {
    return this._changed;
  }

  data(name = null) {
    if (name === null) {
      return this._data;
    } else {
      return this._data[name];
    }
  }

  uri() {
    return this._manager.resolve(this._data);
  }

  path() {
    return this._manager.format(this._data);
  }

  dir() {
    if (this._dir === null) {
      const parsed = path.parse(this.path());

      if (parsed.ext === '') {
        this._dir = this.path();
      } else {
        this._dir = path.parse(this.path()).dir;
      }
    }
    return this._dir;
  }

  inspect() {
    return this.constructor.name + '["' + this.uri() + '"]';
  }

  toString() {
    return this.inspect();
  }

  storage(index = null) {
    if (index) {
      return this._data.storage.split('.')[index];
    } else {
      return this._data.storage;
    }
  }

}
