'use strict';

const TagContainer = use('core/src/TagContainer');
const Tag = use('core/annotations/Tag');

/**
 * @Service(
 *   value = 'helper.tag',
 *   description = 'Helper class for tag support.'
 * )
 *
 * @Inject('helper.boot')
 */
module.exports = class TagHelper {

  constructor() {
    this._cache = {};
  }

  inject(boot) {
    this._boot = boot;
  }

  get(tag) {
    if (this._cache[tag]) return this._cache[tag];
    const mods = this._boot.mods();
    const classes = [];

    for (const index in mods) {
      const readers = mods[index].get(Tag);

      for (const i in readers) {
        classes.push({
          subject: require(readers[i].getPath()),
          reader: readers[i],
        });
      }
    }
    this._cache[tag] = new TagContainer(tag, classes);
    return this._cache[tag];
  }

}
