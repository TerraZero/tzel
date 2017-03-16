'use strict';

const Boot = require('./boot/Boot');
const boot = new Boot({
  base: __dirname,
  settings: require('./settings.json'),
});

boot.booting();

const t = use('annotations/providers/AnnotationProvider');
console.log(t);
const l = load('annotation:Service');
console.log(l);
