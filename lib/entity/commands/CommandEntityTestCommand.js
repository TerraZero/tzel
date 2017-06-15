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
      name: ['hallo'],
      user: [{ value: 4, type: 'user' }, { value: 3, type: 'user' }],
    });

    n.validate().throw('user');
  }

}
