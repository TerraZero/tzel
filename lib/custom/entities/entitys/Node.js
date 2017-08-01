'use strict';

const EntityType = use('entity/src/EntityType');
const Field = use('proxy::field');

/**
 * @EntityType('node')
 */
module.exports = class Node extends EntityType.class {

  init() {
    this.addField('id', new Field('int'), { id: true });
    this.addField('name', new Field('string'));
    this.addField('names', new Field('string')).setCount(3);
    this.addField('user', new Field('entity'), { type: 'user' }).setCount(Infinity);
  }

}
