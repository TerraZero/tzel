'use strict';

require('./boot')('Boot');

const tableManager = use('service::manager.dbtable');

const collection = tableManager.getCallable();
log(collection);
