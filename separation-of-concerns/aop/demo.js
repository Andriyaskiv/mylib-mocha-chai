/**
 * demo.js - runs the AOP calculator. Run with: node separation-of-concerns/aop/demo.js
 */

const { createCalculator } = require('./index');

const calc = createCalculator(); // logs every call to the console

calc.add(12, 4);
calc.subtract(12, 4);
calc.multiply(12, 4);
calc.divide(12, 4);

for (const badCall of [() => calc.divide(12, 0), () => calc.add('12', 4)]) {
  try {
    badCall();
  } catch (error) {
    // already logged by the logging aspect
  }
}
