'use strict';

const fs = require('graceful-fs');

const Command = use('command/Command');

/**
 * @Command(['build:completions', 'bc'])
 *
 * @Inject('helper.boot')
 */
module.exports = class CompletionsCommand extends Command {

  inject(boot) {
    this._boot = boot;
  }

  define() {

  }

  execute() {
    const completions = [];
    const providers = this._boot.providers();
    const services = providers.service._register;

    for (const index in services) {
      completions.push(index);
    }

    for (const index in this._boot.registry().annotations) {
      completions.push('@' + index);
    }
    fs.writeFileSync(base('completions.json'), JSON.stringify(completions, null, 2));
  }

}
