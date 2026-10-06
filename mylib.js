/**
 * mylib - a small arithmetic library.
 *
 * Provides the four basic arithmetic operations. Every function validates
 * that its arguments are finite numbers, and divide() throws an error when
 * the divisor is zero instead of returning Infinity or NaN.
 *
 * @module mylib
 */

/**
 * Throws a TypeError if any of the given values is not a finite number.
 * @param {...*} values - Values to check.
 * @throws {TypeError} If a value is not a finite number.
 */
function validateNumbers(...values) {
  for (const value of values) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError(`Expected a finite number, got: ${value}`);
    }
  }
}

/**
 * Adds two numbers.
 * @param {number} a - First addend.
 * @param {number} b - Second addend.
 * @returns {number} The sum a + b.
 */
function add(a, b) {
  validateNumbers(a, b);
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a - Minuend.
 * @param {number} b - Subtrahend.
 * @returns {number} The difference a - b.
 */
function subtract(a, b) {
  validateNumbers(a, b);
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - First factor.
 * @param {number} b - Second factor.
 * @returns {number} The product a * b.
 */
function multiply(a, b) {
  validateNumbers(a, b);
  return a * b;
}

/**
 * Divides the first number by the second.
 * @param {number} a - Dividend.
 * @param {number} b - Divisor (must not be zero).
 * @returns {number} The quotient a / b.
 * @throws {Error} If b is zero ("ZeroDivision").
 */
function divide(a, b) {
  validateNumbers(a, b);
  if (b === 0) {
    throw new Error('ZeroDivision: division by zero is not allowed');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
