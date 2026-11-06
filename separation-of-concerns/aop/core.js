/**
 * core.js - the CORE concern only: arithmetic.
 *
 * Compare with ../../mylib.js: there, validateNumbers(a, b) is repeated in
 * all four functions (the validation concern is "scattered", and each
 * function is "tangled" with it). Here the functions contain ONLY their
 * own logic; validation and logging live in aspects.js and are woven in.
 *
 * Division by zero stays here because it is a rule of division itself,
 * not a cross-cutting concern.
 *
 * @module aop/core
 */

module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('ZeroDivision: division by zero is not allowed');
    }
    return a / b;
  },
};
