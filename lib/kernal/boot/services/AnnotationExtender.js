'use strict';

const fs = require('graceful-fs');

/**
 * @Service('annotation.extender')
 */
module.exports = class AnnotationExtender {

  getExtendName(code) {
    const name = code.match(/module\.exports = class .* extends (.*)\.class/);

    if (name === null) return null;
    return name[1];
  }

  getExtendUse(code, name) {
    return code.match(new RegExp('const ' + name + ' = use\\(\'(.*)\'\\)'))[1];
  }

  getExtend(file) {
    const code = fs.readFileSync(file + '.js').toString();
    const name = this.getExtendName(code);
    if (name === null) return null;
    return this.getExtendUse(code, name);
  }

}
