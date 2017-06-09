'use strict';

const EntityType = use('entity/test/EntityType');
const FieldType = use('entity/test/FieldType');

/**
 * @EntityType('node')
 */
module.exports = class Node extends EntityType {

  init() {
    this.addField('id', new FieldType('int'));
  }

}
