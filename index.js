'use strict';

require('./boot')('Boot');

const deliver = use('service::deliver');
const Url = use('controller/src/Url');
const url = new Url('command.user.view');
url.setParam('user', 55);
const request = deliver.getRequest(url.generate());
request.execute();

log(url.generate());
