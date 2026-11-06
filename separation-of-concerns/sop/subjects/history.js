/**
 * Subject "history" - the calculator as seen by the END USER who wants
 * to see their previous operations (like the "tape" of a desk calculator).
 *
 * From this point of view each operation is an entry to remember, and the
 * calculator also has extra operations: getHistory() and clearHistory().
 * Those exist ONLY in this subject; the other subjects do not know them.
 *
 * The composer passes a context object as the last argument; ctx.result
 * holds the value computed by an earlier subject.
 *
 * @module sop/subjects/history
 */

function createHistorySubject() {
  const entries = [];
  const remember = (op) => (a, b, ctx) => {
    entries.push({ op, a, b, result: ctx.result });
  };

  return {
    add: remember('add'),
    subtract: remember('subtract'),
    multiply: remember('multiply'),
    divide: remember('divide'),
    getHistory() {
      return entries.map((entry) => ({ ...entry }));
    },
    clearHistory() {
      entries.length = 0;
    },
  };
}

module.exports = { createHistorySubject };
