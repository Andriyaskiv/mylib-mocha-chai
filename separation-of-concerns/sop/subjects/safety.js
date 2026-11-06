/**
 * Subject "safety" - the calculator as seen by the QA / SECURITY team.
 *
 * From this point of view each operation is a gate that must reject bad
 * input. It defines the SAME operations as the arithmetic subject, but
 * with its own meaning: "add" here means "check the inputs of add".
 * It computes nothing.
 *
 * @module sop/subjects/safety
 */

function requireNumbers(...values) {
  for (const value of values) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError(`Expected a finite number, got: ${value}`);
    }
  }
}

module.exports = {
  add(a, b) {
    requireNumbers(a, b);
  },
  subtract(a, b) {
    requireNumbers(a, b);
  },
  multiply(a, b) {
    requireNumbers(a, b);
  },
  divide(a, b) {
    requireNumbers(a, b);
  },
};
