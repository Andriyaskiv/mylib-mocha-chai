/**
 * main.js - simple demo program for the mylib module.
 *
 * Imports mylib, calls every arithmetic function and prints the results.
 * Also shows that dividing by zero throws an error.
 * Run with: npm start  (or: node main.js)
 */

const mylib = require('./mylib');

const a = 12;
const b = 4;

console.log(`${a} + ${b} = ${mylib.add(a, b)}`);
console.log(`${a} - ${b} = ${mylib.subtract(a, b)}`);
console.log(`${a} * ${b} = ${mylib.multiply(a, b)}`);
console.log(`${a} / ${b} = ${mylib.divide(a, b)}`);

// Demonstrate the ZeroDivision error handling
try {
  mylib.divide(a, 0);
} catch (error) {
  console.log(`${a} / 0 -> ${error.message}`);
}
