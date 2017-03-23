'use strict';

require('./boot')('Boot');

const t = use('template::theme.test');
log(t.generate({
  test: 'cool',
}));