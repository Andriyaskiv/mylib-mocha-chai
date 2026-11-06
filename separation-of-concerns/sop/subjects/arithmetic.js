/**
 * Subject "arithmetic" - the calculator as seen by the MATHEMATICIAN.
 *
 * From this point of view a calculator is just four operations that
 * compute a result. It knows nothing about input checking or history.
 *
 * @module sop/subjects/arithmetic
 */

module.exports = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    if (b === 0) {
      throw new Error('ZeroDivision: division by zero is not allowed');
    }
    return a / b;
  },
};
