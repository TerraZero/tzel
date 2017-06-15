'use strict';

const FieldType = use('entity/src/FieldType');

/**
 * @FieldType('string')
 *
 * @Inject('helper.norm')
 */
module.exports = class StringFieldType extends FieldType {

  inject(norm) {
    this._norm = norm;
  }

  define() {
    return {
      value: ['string', null],
    }
  }

}
