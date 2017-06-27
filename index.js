'use strict';

require('./boot')('Boot');

const TestClass = use('boot/TestClass');

const t = new TestClass('cool');
log(t);
