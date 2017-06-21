'use strict';

const Event = use('core/Event');

/**
 * @Event('system.alter')
 */
module.exports = class SystemAlterEvent extends Event {

  setArgs(alter, subject, info, ...args) {
    this._alter = alter;
    this._subject = subject;
    this._info = info;
    this._args = args;
    return this;
  }

  alter() {
    return this._alter;
  }

  subject() {
    return this._subject;
  }

  info() {
    return this._info;
  }

  args() {
    return this._args;
  }

}
