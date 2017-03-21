'use strict';

require('./boot')('Boot');

const deliverer = use('service::deliverer');
const Url = use('controller/src/Url');
const url = new Url('command.user.view', {
  user: 55,
});
const request = deliverer.getRequest(url.generate());
request.execute();

log(url.generate());
