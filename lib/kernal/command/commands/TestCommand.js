'use strict';

const Command = use('command/Command');
const File = use('file/File');

/**
 * @Command(['test', 't'])
 *
 * @Inject('helper.sort')
 */
module.exports = class TestCommand extends Command {

  inject(sorter) {
    this._sorter = sorter;
  }

  define() {

  }

  execute() {
    const items = [
      {
        title: 'a',
        depend: ['b'],
      },
      {
        title: 'b',
        depend: ['c'],
      },
      {
        title: 'c',
        depend: ['d'],
      },
      {
        title: 'd',
        depend: ['a'],
      }
    ];

    const s = this._sorter.dependencies(items, 'depend', 'title', true);
    for (const index in s) {
      log(s[index].title);
    }
  }

}
