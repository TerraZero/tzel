'use strict';

const Provider = use('boot/Provider');
const Command = use('command/annotations/Command');

/**
 * @Provider(
 *   value='command',
 *   weight=1000
 * )
 */
module.exports = class CommandProvider extends Provider.class {

  getAnnotation() {
    return Command.class;
  }

  scan(parser, data) {
    const command = parser.getDefinitions(Command.class, 0);

    if (!command) return false;

    data.add('providers', this.provider());
    data.set('creator', this.provider());
    data.add('alters', this.provider());
    for (const index in command.value) {
      data.add('keys', this.provider() + '::' + command.value[index]);
    }

    data.set('key', command.value.shift());
    data.set('alias', command.value);
    data.set('group', command.group);
    return true;
  }

  create(subject, data, args) {
    return new subject(data.key, data.alias, data.group);
  }

  alter(subject, data, object) {
    object.define();
  }

}
