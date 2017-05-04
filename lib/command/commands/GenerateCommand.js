'use strict';

const color = require('cli-color');
const prompt = require('prompt-sync')({});

const Command = use('command/Command');

/**
 * @Command(['generate', 'gen'])
 */
module.exports = class GenerateCommand extends Command {

  define() {

  }

  execute() {
    const t = color.xterm(243);
    log();
    log('\x1B[1A\x1B[Khallo', color.red('Cool'));
    log('\x1B[1A\x1B[Kcool');
    log('\x1B[1A\x1B[Kcasdasdl');
    log('\x1B[1A\x1B[Kcooasdasdadl');
    log('\x1B[1A\x1B[Kcooqwerl', t.italic('Cool'));
    return;
    const completions = ['command.hallo', 'command.cool', 'tester'];
    const value = prompt('Test:', null, {
      autocomplete: function (value) {
        const tmp = [];

        for (const index in completions) {
          log(completions[index], value, completions[index].indexOf(value));
          if (completions[index].indexOf(value) >= 0) {
            tmp.push(completions[index]);
          }
        }
        log(tmp);
        log(args);
        return tmp;
      },
    });
    log(value);
    return;
    term('Please enter your name: ');
    term.inputField({
      autoComplete: ['test', 'command.hallo', 'command.kk.hk'],
      autoCompleteHint: true,
      tokenHook: function (token, isEndOfInput, previousTokens, term, config) {
        log(token);
      },
    }, function (error, input) {
      log();
      log(error, input);
      process.exit();
    });
    log('hier');
    term.inputField({
      autoComplete: ['test', 'command.hallo', 'command.kk.hk'],
      autoCompleteHint: true,
      tokenHook: function (token, isEndOfInput, previousTokens, term, config) {
        log(token);
      },
    }, function (error, input) {
      log();
      log(error, input);
      process.exit();
    });
  }

}
