import { useState } from "react";
import styled from "styled-components";

const CalculatorContainer = styled.div`
  width: 90%;
  background-color: black;
  padding: 5px;
  border: 2px solid #47476b;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 20px 35px repeat(5, 1fr);
  @media (min-width: 400px) {
    width: 334px;
    height: 394px;
  }
`;
const FormulaScreen = styled.p`
  width: 100%;
  text-align: right;
  line-height: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-family: "Calculator", sans-serif;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
  color: orange;
  grid-column: 1 / 5;
  grid-row: 1 / 2;
`;
const OutputScreen = styled(FormulaScreen)`
  font-size: 29px;
  color: white;
  line-height: 35px;
  grid-column: 1 / 5;
  grid-row: 2 / 3;
`;
const NumberButton = styled.button`
  outline: 1px solid black;
  border: none;
  background-color: #4d4d4d;
  font-family: "Share Tech Mono", monospace;
  font-size: 20px;
  color: white;
  position: relative;
  &:hover {
    outline: 1px solid gray;
    z-index: 2;
  }
`;
const ZeroButton = styled(NumberButton)`
  grid-column: 1 / 3;
`;
const ACButton = styled(ZeroButton)`
  background-color: rgb(172, 57, 57);
`;
const OPButton = styled(NumberButton)`
  background-color: rgb(102, 102, 102);
`;
const EqualButton = styled(NumberButton)`
  background-color: rgb(0, 68, 102);
  grid-column: 4 / 5;
  grid-row: -1 / -3;
`;

const Calculator = () => {
  const [formula, setFormula] = useState("");
  const [output, setOutput] = useState(0);
  const [preOutput, setPreOutput] = useState(null);
  const preInputRegex = /[+×/-]/g;
  const lastInput = formula[formula.length - 1];

  const handleNumber = (e) => {
    const input = e.target.innerText;
    if (preOutput === "NaN") {
      const updatedInput = preOutput + input;
      setOutput(updatedInput);
      setFormula(updatedInput);
      setPreOutput(null);
    } else if (preInputRegex.test(lastInput)) {
      setOutput(input);
      setFormula((prev) => prev + input);
    } else if (preOutput) {
      setOutput(input);
      setFormula(input);
    } else if (output === 0 || lastInput === "0") {
      setOutput(input);
      setFormula(input);
    } else {
      setOutput((prev) => prev + input);
      setFormula((prev) => prev + input);
    }
  };

  const handleDecimal = () => {
    if (preOutput === "NaN" || preOutput) {
      setOutput("0.");
      setFormula("0.");
      setPreOutput(null);
    } else if (
      formula === "" ||
      preInputRegex.test(lastInput) ||
      lastInput === "="
    ) {
      setOutput("0.");
      setFormula((prev) => prev + "0.");
    } else if (lastInput === ".") {
      setOutput(formula);
    } else if (output.indexOf(".") > 0) {
      setOutput((prev) => prev);
      setFormula((prev) => prev);
    } else {
      const updatedInput = formula + ".";
      setOutput(updatedInput);
      setFormula(updatedInput);
    }
  };

  const handleOperator = (e) => {
    const input = e.target.innerText;
    const regex = /[+×/-]{1,}/g;
    if (preOutput || preOutput === "NaN") {
      setOutput(input);
      setFormula(preOutput + input);
      setPreOutput(null);
    } else if (lastInput === ".") {
      setOutput(input);
      setFormula("0" + input);
    } else if (preInputRegex.test(lastInput)) {
      setOutput(input);
      setFormula((prev) => {
        const updatedFormula = prev + input;
        const correctedFormula = updatedFormula.replace(regex, (match) =>
          match.charAt(match.length - 1)
        );
        return correctedFormula;
      });
    } else {
      setOutput(input);
      setFormula((prev) => prev + input);
    }
  };

  const handleMultiply = () => {
    const regex = /×{2,}|[+/-]/g;
    if (preOutput || preOutput === "NaN") {
      const updatedInput = preOutput + "×";
      setOutput("×");
      setFormula(updatedInput);
    } else if (lastInput === "." || formula === "") {
      setOutput("×");
      setFormula("0×");
    } else {
      setOutput("×");
      setFormula((prev) => {
        const updatedFormula = prev + "×";
        const correctedFormula = updatedFormula.replace(regex, (match) =>
          match.charAt(match.length - 1)
        );
        return correctedFormula;
      });
    }
  };

  const handleSubtract = () => {
    const regex = /-{2,}/g;
    if (lastInput === ".") {
      setOutput("-");
      setFormula("0-");
    } else if (regex.test(formula)) {
      setOutput("-");
      setFormula((prev) => prev);
    } else {
      setOutput("-");
      setFormula((prev) => prev + "-");
    }
  };

  const handleClear = () => {
    setOutput(0);
    setFormula("");
    setPreOutput(null);
  };

  const calculate = () => {
    const regex = /-{2,}/g;
    if (formula === "") {
      setFormula("=NaN");
      setOutput("NaN");
      setPreOutput("NaN");
    } else if (regex.test(formula)) {
      const updatedFormula = formula.replace(regex, (match) =>
        match.charAt(match.length - 1)
      );
      setFormula(
        updatedFormula + "=" + eval?.(updatedFormula.replace("×", "*"))
      );
      setOutput(eval?.(updatedFormula.replace("×", "*")));
      setPreOutput(eval?.(updatedFormula.replace("×", "*")));
    } else {
      setFormula(formula + "=" + eval?.(formula.replace("×", "*")));
      setOutput(eval?.(formula.replace("×", "*")));
      setPreOutput(eval?.(formula.replace("×", "*")));
    }
  };

  return (
    <CalculatorContainer>
      <FormulaScreen>{formula}</FormulaScreen>
      <OutputScreen id="display">{output}</OutputScreen>
      <ACButton id="clear" onClick={handleClear}>
        AC
      </ACButton>
      <OPButton id="divide" onClick={handleOperator}>
        /
      </OPButton>
      <OPButton id="multiply" onClick={handleMultiply}>
        x
      </OPButton>
      <NumberButton id="seven" onClick={handleNumber}>
        7
      </NumberButton>
      <NumberButton id="eight" onClick={handleNumber}>
        8
      </NumberButton>
      <NumberButton id="nine" onClick={handleNumber}>
        9
      </NumberButton>
      <OPButton id="subtract" onClick={handleSubtract}>
        -
      </OPButton>
      <NumberButton id="four" onClick={handleNumber}>
        4
      </NumberButton>
      <NumberButton id="five" onClick={handleNumber}>
        5
      </NumberButton>
      <NumberButton id="six" onClick={handleNumber}>
        6
      </NumberButton>
      <OPButton id="add" onClick={handleOperator}>
        +
      </OPButton>
      <NumberButton id="one" onClick={handleNumber}>
        1
      </NumberButton>
      <NumberButton id="two" onClick={handleNumber}>
        2
      </NumberButton>
      <NumberButton id="three" onClick={handleNumber}>
        3
      </NumberButton>
      <EqualButton id="equals" onClick={calculate}>
        =
      </EqualButton>
      <ZeroButton id="zero" onClick={handleNumber}>
        0
      </ZeroButton>
      <NumberButton id="decimal" onClick={handleDecimal}>
        .
      </NumberButton>
    </CalculatorContainer>
  );
};

export default Calculator;
