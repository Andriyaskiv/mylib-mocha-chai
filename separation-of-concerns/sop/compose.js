/**
 * compose.js - composes independent subjects into one calculator.
 *
 * Subject-Oriented Programming (Harrison & Ossher, IBM, 1993) has no
 * "base program": every subject is a peer with its own partial view of
 * the system. A separate COMPOSITION RULE says how the views fit together.
 *
 * The rule implemented here:
 *  1. Correspondence: operations with the SAME NAME in different subjects
 *     are the same operation.
 *  2. Combination "merge": when several subjects define an operation, all
 *     of them run, in the order the subjects are listed.
 *  3. Result: the first value a subject returns is the result of the
 *     operation. Later subjects can read it in ctx.result (last argument).
 *  4. Union: an operation defined by only one subject is kept as it is.
 *
 * @module sop/compose
 */

/**
 * @param {object[]} subjects - Subjects in merge order.
 * @returns {object} The composed object.
 */
function compose(subjects) {
  const names = new Set();
  for (const subject of subjects) {
    for (const [name, value] of Object.entries(subject)) {
      if (typeof value === 'function') names.add(name);
    }
  }

  const composed = {};
  for (const name of names) {
    const implementations = subjects.filter((s) => typeof s[name] === 'function');
    composed[name] = (...args) => {
      const ctx = { result: undefined };
      for (const subject of implementations) {
        const value = subject[name](...args, ctx);
        if (value !== undefined && ctx.result === undefined) ctx.result = value;
      }
      return ctx.result;
    };
  }
  return composed;
}

module.exports = { compose };
