# Separation of concerns: AOP vs SOP

This folder rebuilds `mylib` (the arithmetic library in the repo root) twice,
to compare two ways of separating concerns. The original `mylib.js` is not changed.

## The problem in `mylib.js`

```js
function add(a, b)      { validateNumbers(a, b); return a + b; }
function subtract(a, b) { validateNumbers(a, b); return a - b; }
function multiply(a, b) { validateNumbers(a, b); return a * b; }
function divide(a, b)   { validateNumbers(a, b); /* ... */ return a / b; }
```

Validation is a different concern from arithmetic, but it shows up in every
function (**scattering**), and every function mixes two concerns (**tangling**).
Adding logging or an operation history would make it worse.

## `aop/`: Aspect-Oriented Programming

| File | Role |
|------|------|
| `core.js` | Base program: arithmetic only |
| `aspects.js` | `validation` (before advice) and `logging` (around advice), each written once |
| `weaver.js` | A small weaver: applies each aspect to the functions its **pointcut** selects |
| `index.js` | `weave(core, [logging, validation])` |

The core does not know the aspects exist. The aspects do not list the functions;
their pointcut ("every function") covers new functions automatically.

## `sop/`: Subject-Oriented Programming

| File | Role |
|------|------|
| `subjects/arithmetic.js` | The mathematician's view: compute results |
| `subjects/safety.js` | The QA team's view: reject bad input |
| `subjects/history.js` | The end user's view: remember operations, plus `getHistory()` / `clearHistory()` |
| `compose.js` | Composition rule: match operations **by name**, **merge** them in order, keep the **union** of the rest |
| `index.js` | `compose([safety, arithmetic, history])` |

There is no base program. All three subjects are peers that define the same
operations (`add`, `divide`, ...) with their own meaning, and the composition
rule decides how they combine.

## Main differences

| | AOP | SOP |
|---|---|---|
| Structure | Asymmetric: core + aspects | Symmetric: equal subjects |
| Unit | Aspect (pointcut + advice) | Subject (a full partial view of the system) |
| How code is selected | Quantification: a pointcut matches many join points | Correspondence: same names match |
| Best for | Technical, cross-cutting concerns (logging, security, transactions) | Different stakeholders / features with their own view and state |
| Adding a new function | Aspects apply automatically | Each subject that cares must define it |
| Risk | Hidden behaviour: you read `core.js` and don't see what runs | Composition rules can get complex; name clashes |

## Run it

```bash
npm install
npm test                                   # original + AOP + SOP tests
node separation-of-concerns/aop/demo.js
node separation-of-concerns/sop/demo.js
```
