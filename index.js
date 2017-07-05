'use strict';

require('./boot')('Boot');

const tableManager = use('service::manager.dbtable');

tableManager.getCallable();
