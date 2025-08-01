import { useState } from 'react';

export const useCalculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const deleteLastChar = () => {
    if (currentValue.length === 1) {
      setCurrentValue('0');
      setOverwrite(true);
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  const addDigit = (digit) => {
    if (currentValue === '0' || overwrite) {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue(`${currentValue}${digit}`);
    }
  };

  const addDecimal = () => {
    if (overwrite) {
      setCurrentValue('0.');
      setOverwrite(false);
      return;
    }

    if (!currentValue.includes('.')) {
      setCurrentValue(`${currentValue}.`);
    }
  };

  const selectOperation = (op) => {
    if (currentValue === '0' && previousValue === null) return;

    if (previousValue === null) {
      setPreviousValue(currentValue);
      setCurrentValue('0');
      setOperation(op);
      setOverwrite(true);
      return;
    }

    if (operation) {
      const result = calculate();
      setPreviousValue(result);
      setCurrentValue('0');
      setOperation(op);
      setOverwrite(true);
    }
  };

  const calculate = () => {
    if (!operation || previousValue === null) return currentValue;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      case '%':
        result = prev % current;
        break;
      case '√':
        result = Math.sqrt(current);
        break;
      default:
        return current;
    }

    return result.toString();
  };

  const equals = () => {
    if (operation === null || previousValue === null) return;

    const result = calculate();
    setCurrentValue(result);
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const handlePercentage = () => {
    const value = parseFloat(currentValue) / 100;
    setCurrentValue(value.toString());
  };

  const handleSquareRoot = () => {
    const value = Math.sqrt(parseFloat(currentValue));
    setCurrentValue(value.toString());
    setOverwrite(true);
  };

  return {
    currentValue,
    clear,
    deleteLastChar,
    addDigit,
    addDecimal,
    selectOperation,
    equals,
    handlePercentage,
    handleSquareRoot,
  };
};