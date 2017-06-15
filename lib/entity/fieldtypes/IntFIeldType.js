'use strict';

const FieldType = use('entity/src/FieldType');

/**
 * @FieldType('int')
 *
 * @Inject('helper.norm')
 */
module.exports = class IntFieldType extends FieldType {

  inject(norm) {
    this._norm = norm;
  }

  define() {
    return {
      value: ['int', 0],
    }
  }

}
