'use strict';

const Entity = use('entity/test/Entity');

/**
 * @Service('manager.entity')
 */
module.exports = class EntityManager {

  load(type, id) {
    const entityType = use('entity::' + type);

    return entityType.create({ id: id });
  }

}
