'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:entity:test', 'et'])
 */
module.exports = class CommandEntityTestCommand extends Command {

  define() {

  }

  execute() {
    const node = use('entity::node');

    const n = node.create({
      id: 3,
      name: 'Hallo',
      user: [{ value: 4, type: 'user' }, { value: 3, type: 'user' }],
    });

    log(n.get('name').value());
    log(n.get('user').get(1).get());
  }

}
