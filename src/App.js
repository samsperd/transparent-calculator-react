import { useState } from "react";

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = value => {

    if (
      ops.includes(value) && calc === ''
      ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
        return;
    }

    setCalc(calc + value);
    if (!ops.includes(value)) {
      setResult(Function("return " + calc + value)().toString());
    }
  }

  const createDigits = () => {
    const digits = [];

    for (let i = 9; i > 0; i--) {
      digits.push(
        <button
          key={i}
          onClick={() => updateCalc(i.toString()) }
        >
          {i}
        </button>
      )
    }
    return digits;
  }

  const calculate = () => {
    if ( calc === '' ) {
        return;
    } else
    if (ops.includes(calc.slice(-1))) {
      setCalc(Function("return " + calc.slice(0, -1))().toString());
      return;
    }

    setCalc(Function("return " + calc)().toString());
  }

  const deleteLast = () => {
    if (calc == '') {
      return;
    }

    const value = calc.slice(0, -1);

    setCalc(value);
    const ju = value.slice(0, -1);
    if (ops.includes(value.slice(-1))) {
      setResult(Function("return " + ju )().toString());
    }
    else if (value == '') {
      setResult("");
    }
    else {
      setResult(Function("return " + value)().toString());
    }
  }

  const allClear = () => {
    setCalc("");
    setResult("");
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
            { result ? <span>({ result })</span> : '' }
            &nbsp;
            { calc || "0" }
        </div>
        <div className="keys1">
          <button onClick={deleteLast}>DEL</button>
          <button onClick={allClear}>AC</button>
        </div>

        <div className="keys2">
          <div>

          </div>
          <div className="key1">
            <div className="digits">
              { createDigits() }
              <button onClick={calculate}>=</button>
              <button onClick={() => updateCalc('0')}>0</button>
              <button onClick={() => updateCalc('.')}>.</button>
            </div>
          </div>

          <div className="key2">
            <div className="operators">
              <button onClick={() => updateCalc('/') }>/</button>
              <button onClick={() => updateCalc('*') }>*</button>
              <button onClick={() => updateCalc('-') }>-</button>
              <button onClick={() => updateCalc('+') }>+</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
