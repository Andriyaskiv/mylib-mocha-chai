/**
 * index.js - weaves the aspects into the core to build the calculator.
 *
 * This is the only place where the concerns meet. To remove logging,
 * remove one line here; core.js does not change.
 *
 * @module aop
 */

const core = require('./core');
const { validation, logging } = require('./aspects');
const { weave } = require('./weaver');

/**
 * Builds the AOP calculator.
 * @param {object} [options]
 * @param {Function|null} [options.log=console.log] - Logger, or null to disable the logging aspect.
 * @returns {{add: Function, subtract: Function, multiply: Function, divide: Function}}
 */
function createCalculator({ log = console.log } = {}) {
  const aspects = [validation];
  if (log) aspects.unshift(logging(log)); // logging outermost: it also sees validation errors
  return weave(core, aspects);
}

module.exports = { createCalculator };
