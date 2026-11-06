/**
 * Tests for the Subject-Oriented version (separation-of-concerns/sop).
 * The first block repeats the behaviour of the original mylib tests to
 * show that the composed calculator behaves exactly like mylib.js.
 */

const { expect } = require('chai');
const {
  createCalculator,
  compose,
  arithmetic,
  safety,
  createHistorySubject,
} = require('../separation-of-concerns/sop');

describe('SOP calculator', function () {
  describe('same behaviour as mylib.js', function () {
    const calc = createCalculator();

    it('should do the four operations', function () {
      expect(calc.add(2, 3)).to.equal(5);
      expect(calc.subtract(10, 4)).to.equal(6);
      expect(calc.multiply(3, 4)).to.equal(12);
      expect(calc.divide(1, 4)).to.equal(0.25);
    });

    it('should throw ZeroDivision when dividing by zero', function () {
      expect(() => calc.divide(5, 0)).to.throw(Error, 'ZeroDivision');
    });

    it('should throw a TypeError for non-number arguments (safety subject)', function () {
      expect(() => calc.add('2', 3)).to.throw(TypeError);
    });
  });

  describe('subjects are independent and composable', function () {
    it('the history subject records each successful operation', function () {
      const calc = createCalculator();
      calc.add(2, 3);
      calc.divide(8, 2);
      expect(() => calc.add('x', 1)).to.throw(TypeError); // rejected before it is recorded

      expect(calc.getHistory()).to.deep.equal([
        { op: 'add', a: 2, b: 3, result: 5 },
        { op: 'divide', a: 8, b: 2, result: 4 },
      ]);

      calc.clearHistory();
      expect(calc.getHistory()).to.deep.equal([]);
    });

    it('getHistory() only exists in the history subject (union rule)', function () {
      expect(arithmetic).to.not.have.property('getHistory');
      expect(createCalculator()).to.have.property('getHistory');
    });

    it('a different composition gives a different system', function () {
      const noSafety = compose([arithmetic, createHistorySubject()]);
      expect(noSafety.add('2', 3)).to.equal('23'); // nobody checks the input

      const onlyMath = compose([arithmetic]);
      expect(onlyMath.multiply(3, 4)).to.equal(12);
      expect(onlyMath).to.not.have.property('getHistory');
    });

    it('the safety subject alone computes nothing', function () {
      expect(safety.add(2, 3)).to.equal(undefined);
    });
  });
});
