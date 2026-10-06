# mylib-mocha-chai

A small JavaScript arithmetic library (`mylib`) with a demo program and a Mocha + Chai unit test suite.

## Structure

- `mylib.js` – library: `add`, `subtract`, `multiply`, `divide` (throws on division by zero)
- `main.js` – demo program that imports and uses `mylib`
- `tests/mylib.test.js` – Mocha + Chai unit tests

## Usage

```bash
npm install   # install Mocha and Chai
npm start     # run the main program
npm test      # run the unit tests only
```
