/**
 * Unit tests for the mylib module, written with Mocha (test runner)
 * and Chai (assertion library, "expect" style).
 * Run with: npm test   (main.js is NOT executed)
 */

const { expect } = require('chai');
const mylib = require('../mylib');

describe('mylib', function () {
  let startTime;

  // Runs once before any test in this suite
  before(function () {
    startTime = Date.now();
    console.log('    [before] Starting mylib test suite');
  });

  // Runs once after all tests in this suite have finished
  after(function () {
    const duration = Date.now() - startTime;
    console.log(`    [after] mylib test suite finished in ${duration} ms`);
  });

  describe('add()', function () {
    it('should add two positive numbers', function () {
      expect(mylib.add(2, 3)).to.equal(5);
    });

    it('should add negative numbers', function () {
      expect(mylib.add(-2, -3)).to.equal(-5);
    });

    it('should add decimals with floating point tolerance', function () {
      expect(mylib.add(0.1, 0.2)).to.be.closeTo(0.3, 1e-10);
    });
  });

  describe('subtract()', function () {
    it('should subtract two numbers', function () {
      expect(mylib.subtract(10, 4)).to.equal(6);
    });

    it('should return a negative result when b > a', function () {
      expect(mylib.subtract(4, 10)).to.equal(-6);
    });
  });

  describe('multiply()', function () {
    it('should multiply two numbers', function () {
      expect(mylib.multiply(3, 4)).to.equal(12);
    });

    it('should return 0 when multiplying by 0', function () {
      expect(mylib.multiply(7, 0)).to.equal(0);
    });
  });

  describe('divide()', function () {
    it('should divide two numbers', function () {
      expect(mylib.divide(12, 4)).to.equal(3);
    });

    it('should return a decimal result', function () {
      expect(mylib.divide(1, 4)).to.equal(0.25);
    });

    it('should throw an error when dividing by zero', function () {
      expect(() => mylib.divide(5, 0)).to.throw(Error, 'ZeroDivision');
    });
  });

  describe('input validation', function () {
    it('should throw a TypeError for non-number arguments', function () {
      expect(() => mylib.add('2', 3)).to.throw(TypeError);
    });
  });
});
