'use strict';

const File = use('file/File');

module.exports = class FileSystemInit {

  /**
   * @Inject('settings')
   */
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
