'use strict';

/**
 * @Inject('manager.db')
 */
module.exports = class FileSystemInit {

  inject(db) {
    this._db = db;
  }

  /**
   * @Listener('system.end')
   *
   * @param {Event} event
   */
  end(event) {
    this._db.closeAll();
  }

}
