'use strict';

const Event = use('core/Event');

/**
 * @Base('event.command')
 */
module.exports = class CommandEventBase extends Event {

  /**
   * @param {Command} command the command which called the event
   */
  setArgs(command) {
    this._command = command;
    return this;
  }

  /**
   * Getter for the command
   *
   * @return {Command}
   */
  command() {
    return this._command;
  }

  /**
   * Wrapper function for output text
   *
   * @param {string} type Type of the output
   * @param {string} text The message for output
   * @param {string[]} args The arguments for the placeholder in text
   */
  out(type, text, ...args) {
    const c = this.command().color(type);

    text = this.command().replaceLine(text, args);
    this.command().out(c(text));
  }

}
