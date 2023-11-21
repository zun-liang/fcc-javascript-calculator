import styled from "styled-components";
import { useState } from "react";

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
const FormulaScreen = styled.div`
  width: 100%;
  text-align: right;
  vertical-align: text-top;
  line-height: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  font-family: "Roboto Mono", monospace;
  font-size: 20px;
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
  const handleClick = (e) => {
    const input = e.target.innerText;
    setOutput(input);
    setFormula((prev) => prev + input);
  };
  const handleClear = () => {
    setOutput(0);
    setFormula("");
  };
  const calculate = () => {
    console.log(typeof formula.replace('"', ""));
    setOutput(formula.replace('"', ""));
  };

  return (
    <CalculatorContainer>
      <FormulaScreen>{formula}</FormulaScreen>
      <OutputScreen id="display">{output}</OutputScreen>
      <ACButton id="clear" onClick={handleClear}>
        AC
      </ACButton>
      <OPButton id="divide" onClick={handleClick}>
        /
      </OPButton>
      <OPButton id="multiply" onClick={handleClick}>
        x
      </OPButton>
      <NumberButton id="seven" onClick={handleClick}>
        7
      </NumberButton>
      <NumberButton id="eight" onClick={handleClick}>
        8
      </NumberButton>
      <NumberButton id="nine" onClick={handleClick}>
        9
      </NumberButton>
      <OPButton id="subtract" onClick={handleClick}>
        -
      </OPButton>
      <NumberButton id="four" onClick={handleClick}>
        4
      </NumberButton>
      <NumberButton id="five" onClick={handleClick}>
        5
      </NumberButton>
      <NumberButton id="six" onClick={handleClick}>
        6
      </NumberButton>
      <OPButton id="add" onClick={handleClick}>
        +
      </OPButton>
      <NumberButton id="one" onClick={handleClick}>
        1
      </NumberButton>
      <NumberButton id="two" onClick={handleClick}>
        2
      </NumberButton>
      <NumberButton id="three" onClick={handleClick}>
        3
      </NumberButton>
      <EqualButton id="equals" onClick={calculate}>
        =
      </EqualButton>
      <ZeroButton id="zero" onClick={handleClick}>
        0
      </ZeroButton>
      <NumberButton id="decimal" onClick={handleClick}>
        .
      </NumberButton>
    </CalculatorContainer>
  );
};

export default Calculator;
