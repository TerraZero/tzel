'use strict';

const Boot = require('./boot/Boot');
const boot = new Boot({
  base: __dirname,
  settings: require('./settings.json'),
});

boot.booting();

const cool = use('service:cool');
