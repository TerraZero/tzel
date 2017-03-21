'use strict';

module.exports = function booting(name) {
  const Boot = require('./boot/' + name);
  const boot = new Boot({
    base: __dirname,
    settings: require('./settings.json'),
  });

  boot.booting();
};
