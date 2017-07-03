'use strict';

require('./boot')('Boot');

const File = use('file/File');

const f = new File('theme::compiled');

log(f.list());
