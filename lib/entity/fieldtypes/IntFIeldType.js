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

  defaultSettings() {
    return {
      id: false,
    };
  }

  store(field, table, db) {
    table.addField('value', 'int');
  }

  attach(field, table, db) {
    if (field.setting('id')) {
      table.addField(field.name(), 'int', true, true);
    } else {
      table.addField(field.name(), 'int');
    }
  }

}
