'use strict';

const EntityType = use('entity/test/EntityType');
const Field = use('proxy::field');

/**
 * @EntityType('node')
 */
module.exports = class Node extends EntityType {

  init() {
    this.addField('id', new Field('int'));
    this.addField('name', new Field('string'));
    this.addField('user', new Field('entity'), { types: ['user'] }).setCount(Infinity);
  }

}
