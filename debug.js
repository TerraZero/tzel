'use strict';

require('./boot')('Boot');

const Executer = use('command/Executer');
const executer = new Executer('et');

executer.execute();
