/**
 * demo.js - runs the SOP calculator.
 * Run with: node separation-of-concerns/sop/demo.js
 */

const { createCalculator } = require('./index');

const calc = createCalculator();

console.log(`12 + 4 = ${calc.add(12, 4)}`);
console.log(`12 - 4 = ${calc.subtract(12, 4)}`);
console.log(`12 * 4 = ${calc.multiply(12, 4)}`);
console.log(`12 / 4 = ${calc.divide(12, 4)}`);

try {
  calc.add('12', 4);
} catch (error) {
  console.log(`'12' + 4 -> ${error.message}`); // rejected by the safety subject
}

console.log('History (from the history subject):');
console.table(calc.getHistory());
