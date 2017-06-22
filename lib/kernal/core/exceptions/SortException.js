'use strict';

const Exception = use('core/Exception');

/**
 * @Exception('sort')
 */
module.exports = class SortException extends Exception {

  init() {
    super.init();
    this.setType(0);

    this._tree = null;
  }

  setType(type) {
    this.setMessage(this.types()[type]);
    return this;
  }

  setTree(tree) {
    this._tree = tree;
    return this;
  }

  types() {
    return [
      'Detect dependencie loop by [0] in current tree [tree]',
      'Detect unknown dependencie [0] in [1]',
    ];
  }

  placeholders() {
    return {
      tree: this.getCurrentTree,
    }
  }

  getCurrentTree() {
    return this._tree.join(' -> ');
  }

}
