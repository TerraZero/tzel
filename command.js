'use strict';

const argv = require('yargs').argv;

const Boot = require('./boot/Boot');
const boot = new Boot({
  base: __dirname,
  settings: require('./settings.json'),
});

boot.booting();

const Executer = use('command/Executer');
const executer = new Executer(argv);

executer.execute();
