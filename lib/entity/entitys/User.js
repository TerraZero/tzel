'use strict';

const EntityType = use('entity/src/EntityType');
const Field = use('proxy::field');

/**
 * @EntityType('user')
 */
module.exports = class User extends EntityType {

  init() {
    this.addField('id', new Field('int'));
    this.addField('name', new Field('string'));
  }

}
