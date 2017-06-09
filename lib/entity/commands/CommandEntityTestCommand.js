'use strict';

const Command = use('command/Command');

const Entity = use('entity/test/Entity');

/**
 * @Command(['command:entity:test', 'et'])
 */
module.exports = class CommandEntityTestCommand extends Command {

  define() {

  }

  execute() {
    const e = new Entity(1);

    e.get('node').add(new Entity(2)).add(new Entity(3));

    log(e.get('node'));
    for (const index of e.get('node')) {
      log(index);
    }
  }

}
