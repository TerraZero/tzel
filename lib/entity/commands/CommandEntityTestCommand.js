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
      name: ['hallo', 'cool'],
      node: [{ value: 4, type: 'user' }, { value: 3, type: 'node' }],
    });

    log(n.id());
    log(n.get('name').value(1));
    log(n.get('name'));
    log(n.get('name').get(0));
    log(n.get('node').get(0).data());
    log(n.get('node').get(1).data());
    log(n.get('node').get(0).value());
  }

}
