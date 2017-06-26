'use strict';

module.exports = function booting(name) {
  const Use = require('./lib/kernal/boot/src/Use');
  const use = new Use();

  const Boot = require('./lib/kernal/boot/src/' + name);
  const boot = new Boot({
    base: __dirname,
    settings: require('./settings.json'),
  });

  use.setBoot(boot);
  boot.booting();
};
