'use strict';

require('./boot')('Boot');

const handler = use('service::handler.event');
handler.trigger('tester', 'cool');
