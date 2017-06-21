'use strict';

const FieldType = use('entity/src/FieldType');

/**
 * @FieldType('entity')
 *
 * @Inject('manager.entity')
 */
module.exports = class EntityFieldType extends FieldType {

  inject(manager) {
    this._manager = manager;
  }

  define() {
    return {
      value: ['int', 0],
      type: ['string', null],
      entity: ['any', null],
    };
  }

  defaultSettings() {
    return {
      type: null,
    };
  }

  get(field, item) {
    const prop = this.prop(field, item);

    if (prop.entity === null) {
      prop.entity = this._manager.load(prop.type, prop.value);
    }
    return prop.entity;
  }

  validate(field, validator, item, value) {
    super.validate(field, validator, item, value);
    if (validator.isBreak(false)) return;

    const type = field.setting('type');

    if (value.type !== type) {
      validator.break().add('field.validate').setItem(item).setType(2).setArgs(value.type);
    }
  }

  hasStore(field) {
    return true;
  }

  store(field, table, db) {
    const name = this._manager.getTable(field.setting('type'));
    const reference = db.table(name);

    table.addField('type', 'varchar').length(255);
    table.addField('value', 'int').onDelete(reference.field('id'));
  }

}
