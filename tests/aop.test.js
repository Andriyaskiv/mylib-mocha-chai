/**
 * Tests for the Aspect-Oriented version (separation-of-concerns/aop).
 * The first block repeats the behaviour of the original mylib tests to
 * show that the woven calculator behaves exactly like mylib.js.
 */

const { expect } = require('chai');
const { createCalculator } = require('../separation-of-concerns/aop');
const core = require('../separation-of-concerns/aop/core');
const { weave } = require('../separation-of-concerns/aop/weaver');

describe('AOP calculator', function () {
  describe('same behaviour as mylib.js', function () {
    const calc = createCalculator({ log: null });

    it('should do the four operations', function () {
      expect(calc.add(2, 3)).to.equal(5);
      expect(calc.subtract(10, 4)).to.equal(6);
      expect(calc.multiply(3, 4)).to.equal(12);
      expect(calc.divide(1, 4)).to.equal(0.25);
    });

    it('should throw ZeroDivision when dividing by zero', function () {
      expect(() => calc.divide(5, 0)).to.throw(Error, 'ZeroDivision');
    });

    it('should throw a TypeError for non-number arguments (validation aspect)', function () {
      expect(() => calc.add('2', 3)).to.throw(TypeError);
    });
  });

  describe('aspects are separate from the core', function () {
    it('the core alone has no validation', function () {
      expect(core.add('2', 3)).to.equal('23');
    });

    it('the logging aspect logs calls, results and errors', function () {
      const lines = [];
      const calc = createCalculator({ log: (line) => lines.push(line) });

      calc.multiply(3, 4);
      expect(() => calc.divide(1, 0)).to.throw();

      expect(lines).to.deep.equal([
        '[log] multiply(3, 4) = 12',
        '[log] divide(1, 0) threw "ZeroDivision: division by zero is not allowed"',
      ]);
    });

    it('a pointcut can select only some join points', function () {
      const calls = [];
      const onlyDivide = { pointcut: (name) => name === 'divide', before: (jp) => calls.push(jp.name) };
      const calc = weave(core, [onlyDivide]);

      calc.add(1, 1);
      calc.divide(4, 2);

      expect(calls).to.deep.equal(['divide']);
    });
  });
});
