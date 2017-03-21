'use strict';

const CommandAnnotation = use('command/annotations/Command');

/**
 * @interface
 */
module.exports = class Command {

  constructor(name, aliases, booter) {
    this._name = name;
    this._aliases = aliases;
    this._executer = null;
    this._booter = booter;

    this._infos = {
      counter: {
        arguments: 0,
        options: 0,
      },
      arguments: {},
      multiArgument: false,
      options: {},
      group: 'nogroup',
    };

    this.define();
  }

  /**
   * Get the base command name.
   *
   * @returns {string}
   */
  name() {
    return this._name;
  }

  /**
   * Return all aliases of this command.
   *
   * @returns {string[]}
   */
  aliases() {
    return this._aliases;
  }

  /**
   * Get the current executer.
   *
   * @returns {Executer}
   */
  getExecuter() {
    return this._executer;
  }

  /**
   * Get the current booter.
   *
   * @returns {Booter}
   */
  getBooter() {
    return this._booter;
  }

  /**
   * The definition function for the command.
   *
   * @abstract
   */
  define() { }

  /**
   * The execute function for the command.
   *
   * @abstract
   */
  execute() { }

  /**
   * Init the command before execution
   *
   * @param {Executer} executer
   */
  init(executer) {
    this._executer = executer;
  }

  /**
   * Check if the current command with all arguments satisfy the definition.
   * @returns {boolean}
   */
  check() {
    for (const index in this._infos.arguments) {
      const argument = this._infos.arguments[index];

      if (argument.fallback === null && this.args()._[argument.index] === undefined) {
        this.error('ArgumentRequired', 'The Argument [0] on position [1] is required!', argument.key, argument.index);
      }
    }
    return true;
  }

  /**
   * Wrapper function for executer.
   *
   * @see Executer.args()
   * @returns {object}
   */
  args() {
    return this.getExecuter().args();
  }

  /**
   * Get the current value of a argument.
   *
   * @param {string} key
   * @returns {any}
   */
  argument(key) {
    const argument = this.getArgument(key);

    if (argument.multi) return this.arguments(argument.key);
    return this.args()._[argument.index] || argument.fallback || null;
  }

  /**
   * Get a list of arguments.
   * If {to} is -1 than all arguments after {from} are collected.
   *
   * @param {number} from
   * @param {number} to
   * @returns {string[]}
   */
  arguments(from = 0, to = -1) {
    const args = [];

    if (typeof from === 'string') from = this.getArgument(from).index;
    if (typeof to === 'string') to = this.getArgument(to).index;

    for (let i = from; (i < to || to === -1) && i < this.args()._.length; i++) {
      args.push(this.args()._[i]);
    }
    return args;
  }

  /**
   * Get the argument definition of a key.
   *
   * @param {string} key
   */
  getArgument(key) {
    let argument = this._infos.arguments[key];

    if (argument === undefined) this.error('ArgumentDefinition', 'Not found a argument definition for key [0]', key);
    return argument;
  }

  /**
   * Define method.
   * Add a argument definition to this command.
   *
   * @param {string} key
   * @param {any} fallback
   * @param {object} options
   * @returns {this}
   */
  addArgument(key, fallback = null, options = {}) {
    const argument = {
      key: key,
      fallback: fallback,
      validate: options.validate || null,
      multi: options.multi || false,
      index: (this._infos.counter.arguments++) + 1,
    };

    if (this._infos.multiArgument) this.error('ArgumentMulti', 'It is not allowed to add an argument after a multi argument.');

    if (argument.multi) {
      this._infos.multiArgument = true;
    }

    this._infos.arguments[key] = argument;
    return this;
  }

  /**
   * Define method.
   * Add a option definition for this command.
   *
   * @param {string} key
   * @param {any} fallback
   * @param {object} options
   * @returns {this}
   */
  addOption(key, fallback = null, options = {}) {
    this.checkOptionKeys(key, options.aliases);

    this._infos.options[key] = {
      key: key,
      fallback: fallback,
      validate: options.validate || undefined,
      aliases: options.aliases || null,
      index: this._infos.counter.options++,
    };
    return this;
  }

  checkOptionKeys(key, aliases) {
    if (['d', 'q'].indexOf(key) !== -1) this.error('OccupiedOption', 'It is not allowed to add an option with key [0].', key);

    for (const index in aliases) {
      if (['d', 'q'].indexOf(aliases[index]) !== -1) this.error('OccupiedOption', 'It is not allowed to add an option with alias [0].', aliases[index]);
    }
  }

  /**
   * Get the value of a option definition.
   *
   * @param {string} key
   * @returns {any}
   */
  option(key) {
    let option = this._infos.options[key];

    if (this.args()[option.key] !== undefined) return this.args()[option.key];

    for (const index in option.aliases) {
      if (this.args()[option.aliases[index]] !== undefined) return this.args()[option.aliases[index]];
    }
    if (option.fallback === undefined) return null;
    return option.fallback;
  }

  /**
   * Get the current group of this command.
   *
   * @returns {srting}
   */
  group() {
    return this._infos.group;
  }

  /**
   * Define method.
   * Sets the group of this command.
   *
   * @param {string} group
   * @returns {this}
   */
  setGroup(group) {
    this._infos.group = group;
    return this;
  }

  /**
   * Wrapper function for executer.
   *
   * @see Executer.output()
   * @param {string} text with placeholders
   * @param {string[]} args
   * @returns {this}
   */
  out(text, ...args) {
    text = this.replaceLine(text, args);
    this.info(0, text);
    this.getExecuter().output(text);
    return this;
  }

  /**
   * Wrapper function for executer.
   *
   * @see Executer.getDebugLevel()
   * @returns {number}
   */
  getDebugLevel() {
    return this.getExecuter().getDebugLevel();
  }

  /**
   * Shortcut for logger
   *
   * @returns {this}
   */
  log() {
    if (!this.isQuiet()) {
      console.log.apply(console, arguments);
    }
    return this;
  }

  /**
   * @param {number} level
   * @param {string} text with placeholders
   * @param {string[]} args
   * @returns {this}
   */
  info(level = 1, text = '', ...args) {
    if (level < this.getDebugLevel()) {
      text = this.replaceLine(text, args);
      this.log(text);
    }
    return this;
  }

  /**
   * @param {string} type of error
   * @param {string} text with placeholders
   * @param {string[]} args
   */
  error(type, text, ...args) {
    text = this.replaceLine(text, args);
    throw new Error(type + ': ' + text);
  }

  /**
   * @param {string} text with placeholders
   * @param {string[]} args
   * @returns {string}
   */
  replaceLine(text, args) {
    for (const index in args) {
      text = text.replace('\[' + index + '\]', '"' + args[index] + '"');
    }
    return text;
  }

  /**
   * Wrapper function for executer.
   *
   * @see Executer.setQuiet()
   * @param {boolean} mode
   * @returns {this}
   */
  setQuiet(mode) {
    this.getExecuter().setQuiet(mode);
    return this;
  }

  /**
   * Wrapper function for executer.
   *
   * @see Executer.isQuiet()
   * @returns {boolean}
   */
  isQuiet() {
    return this.getExecuter().isQuiet();
  }

}
