'use strict';

const yargs = require('yargs');
const Command = use('command/Command');

module.exports = class Executer {

  /**
   * @param {string|object} a command stirng or a yargs.argv object
   * @param {Executer|Command|null} a command from this spawn
   */
  constructor(args, spawn = null) {
    this._out = [];
    this.setArgs(args);
    this.setSpawn(spawn);
  }

  /**
   * Set the argument object for the execution.
   *
   * @param {string|object} a command stirng or a yargs.argv object
   * @returns {this}
   */
  setArgs(args) {
    if (typeof args === 'string') {
      this._args = yargs.parse(args);
    } else {
      this._args = args;
    }
    this._command = use('command::' + this._args._[0]);
    return this;
  }

  /**
   * Inherit options from a parent executer.
   *
   * @param {Executer|Command|null} spawn
   * @returns {this}
   */
  setSpawn(spawn = null) {
    if (spawn) {
      if (spawn instanceof Command) {
        spawn = spawn.getExecuter();
      }
      this.setDebugLevel(spawn.getDebugLevel());
      this.setQuiet(spawn.isQuiet());
    }
    return this;
  }

  /**
   * Execute the current command
   *
   * @returns {this}
   */
  execute() {
    if (this.command()) {
      const command = this.command();

      command.init(this);
      if (command.check()) {
        command.execute();
      }
    } else {
      throw new Error('Unknown command "' + this._args._[0] + '"');
    }
    return this;
  }

  /**
   * @returns {Command}
   */
  command() {
    return this._command;
  }

  /**
   * @returns {object} yargs.argv
   */
  args() {
    return this._args;
  }

  /**
   * @param {string} line
   * @returns {this}
   */
  output(line) {
    this._out.push(line);
    return this;
  }

  /**
   * @returns {string[]}
   */
  out() {
    return this._out;
  }

  /**
   * Set the current debug level for this executer.
   * Override the "d" option.
   *
   * @param {number} level
   * @returns {this}
   */
  setDebugLevel(level) {
    this.args()['d'] = level;
    return this;
  }

  /**
   * Get the current debug level for this executer.
   */
  getDebugLevel() {
    return this.args()['d'] || 1;
  }

  /**
   * Set the quiet mode.
   *
   * @param {boolean} mode
   * @returns {this}
   */
  setQuiet(mode) {
    this.args()['q'] = mode;
    return this;
  }

  /**
   * Get the quiet mode.
   *
   * @returns {boolean}
   */
  isQuiet() {
    return this.args()['q'] || false;
  }

}
