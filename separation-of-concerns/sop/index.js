/**
 * index.js - builds the calculator by composing the three subjects.
 *
 * Order matters for the merge rule: safety checks first, arithmetic
 * computes the result, history records it.
 *
 * @module sop
 */

const arithmetic = require('./subjects/arithmetic');
const safety = require('./subjects/safety');
const { createHistorySubject } = require('./subjects/history');
const { compose } = require('./compose');

/**
 * Builds the SOP calculator.
 * @returns {{add, subtract, multiply, divide, getHistory, clearHistory}}
 */
function createCalculator() {
  return compose([safety, arithmetic, createHistorySubject()]);
}

module.exports = { createCalculator, compose, arithmetic, safety, createHistorySubject };
