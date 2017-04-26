'use strict';

module.exports = class FileSystemInit {

  /**
   * @Listener('command.system.init')
   *
   * @param {Event} event
   */
  init(event) {
    log('file: system.init');
  }

}
