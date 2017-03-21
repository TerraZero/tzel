'use strict';

require('./boot')('Boot');

const argv = require('yargs').argv;

const Executer = use('command/Executer');
const executer = new Executer(argv);

executer.execute();
