'use strict';

const TagContainer = use('core/src/TagContainer');

/**
 * @Service(
 *   value = 'helper.tag',
 *   description = 'Helper class for tag support.'
 * )
 */
module.exports = class TagHelper {

  get(tag) {
    return new TagContainer(tag);
  }

}
