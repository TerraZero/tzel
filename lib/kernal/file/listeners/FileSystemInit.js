'use strict';

const File = use('file/File');

/**
 * @Inject('helper.settings')
 */
module.exports = class FileSystemInit {

  inject(settings) {
    this._settings = settings;
  }

  /**
   * @Listener('command.system.init')
   *
   * @param {Event} event
   */
  init(event) {
    const storages = this._settings.get('files.storages');

    for (const index in storages) {
      const file = new File(storages[index]);

      file.createDir();
    }
  }

}
