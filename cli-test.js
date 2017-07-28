'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: function (line) {
    const completions = ['clear', 'clearing', 'run'];
    const hits = completions.filter((c) => c.startsWith(line));

    return [hits.length ? hits : completions, line];
  },
  prompt: 'input: ',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'clear':
      readline.clearScreenDown(rl);
      console.log('cleared');
      break;
    case 'clearing':
      readline.clearLine(rl, 0);
      console.log('cleared line');
      break;
    case 'run':
      console.log('run');
      break;
    default:
      console.log('nothing');
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('closed');
  process.exit(0);
});
