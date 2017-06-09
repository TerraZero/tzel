'use strict';

const Command = use('command/Command');

/**
 * @Command(['command:entity:test', 'et'])
 */
module.exports = class CommandEntityTestCommand extends Command {

  define() {

  }

  execute() {
    const node = use('etype::node');
    const n = node.create();
    n.get('id').add(6);
    log(n.get('id').value());
  }

}
