'use strict';

module.exports = class FileSystemInit {

  /**
   * @Inject('manager.db')
   */
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
