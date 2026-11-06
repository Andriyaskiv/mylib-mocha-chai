/**
 * weaver.js - a tiny Aspect-Oriented Programming (AOP) "weaver".
 *
 * AOP vocabulary used in this folder:
 *  - join point : a point in the execution where extra behaviour can be added.
 *                 Here: every call to a function of the module.
 *  - pointcut   : a predicate that selects join points (here: by function name).
 *  - advice     : the code that runs at the selected join points
 *                 (before, after or around the original call).
 *  - aspect     : one cross-cutting concern = pointcut + advice.
 *  - weaving    : combining the core code with the aspects.
 *
 * Real tools (AspectJ, Spring AOP) do this with a compiler or proxies;
 * here it is done with plain JavaScript function wrapping.
 *
 * @module weaver
 */

/**
 * Wraps one function with the advice of one aspect.
 * @param {string} name - Name of the function (part of the join point).
 * @param {Function} fn - The function to wrap.
 * @param {object} aspect - { pointcut, before?, around?, after? }
 * @returns {Function} The advised function.
 */
function applyAdvice(name, fn, aspect) {
  return function advised(...args) {
    const joinPoint = { name, args };
    if (aspect.before) aspect.before(joinPoint);
    const proceed = () => fn.apply(this, args);
    const result = aspect.around ? aspect.around(joinPoint, proceed) : proceed();
    if (aspect.after) aspect.after(joinPoint, result);
    return result;
  };
}

/**
 * Weaves a list of aspects into every function of `target`.
 * The first aspect in the list becomes the outermost wrapper.
 * The original `target` object is not modified.
 *
 * @param {object} target - Object whose function properties are the join points.
 * @param {object[]} aspects - Aspects to apply.
 * @returns {object} A new object with the advised functions.
 */
function weave(target, aspects) {
  const woven = {};
  for (const [name, fn] of Object.entries(target)) {
    let wrapped = fn;
    for (const aspect of [...aspects].reverse()) {
      if (aspect.pointcut(name)) {
        wrapped = applyAdvice(name, wrapped, aspect);
      }
    }
    woven[name] = wrapped;
  }
  return woven;
}

module.exports = { weave };
