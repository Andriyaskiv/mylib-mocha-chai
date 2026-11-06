/**
 * aspects.js - the CROSS-CUTTING concerns, each written exactly once.
 *
 * Each aspect has a pointcut (which functions it applies to) and advice
 * (what it does). Neither aspect knows which arithmetic functions exist:
 * the pointcut "every function" quantifies over all of them, so a new
 * function added to core.js is validated and logged automatically.
 *
 * @module aop/aspects
 */

/** Pointcut that matches every function. */
const everyFunction = () => true;

/**
 * Validation aspect (before advice): every argument must be a finite number.
 */
const validation = {
  name: 'validation',
  pointcut: everyFunction,
  before({ args }) {
    for (const value of args) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new TypeError(`Expected a finite number, got: ${value}`);
      }
    }
  },
};

/**
 * Creates a logging aspect (around advice) that logs each call,
 * its result, or the error it threw.
 * @param {Function} [log=console.log] - Where to write the log lines.
 * @returns {object} The logging aspect.
 */
function logging(log = console.log) {
  return {
    name: 'logging',
    pointcut: everyFunction,
    around(joinPoint, proceed) {
      const call = `${joinPoint.name}(${joinPoint.args.map((arg) => JSON.stringify(arg)).join(', ')})`;
      try {
        const result = proceed();
        log(`[log] ${call} = ${result}`);
        return result;
      } catch (error) {
        log(`[log] ${call} threw "${error.message}"`);
        throw error;
      }
    },
  };
}

module.exports = { validation, logging };
