'use strict';

const fs = require('graceful-fs');

const Command = use('command/Command');

/**
 * @Command(['build:completions', 'bc'])
 */
module.exports = class ShowCommand extends Command {

  define() {

  }

  execute() {
    const completions = [];
    const providers = this.getBooter().getProviders();
    const services = providers.service._register;

    for (const index in services) {
      completions.push(index);
    }

    for (const index in this.getBooter().annotationParser().registry().annotations) {
      completions.push('@' + index);
    }
    fs.writeFileSync(base('completions.json'), JSON.stringify(completions, null, 2));
  }

}
