import { useState, useEffect } from 'react';

export const useCalculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(true);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  const clearHistory = () => {
    setHistory([]);
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
      const result = calculate(false);
      setPreviousValue(result);
      setCurrentValue('0');
      setOperation(op);
      setOverwrite(true);
    }
  };

  const calculate = (saveToHistory = true) => {
    if (!operation || previousValue === null) return currentValue;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;
    let operationSymbol = operation;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        operationSymbol = '×';
        break;
      case '÷':
        result = prev / current;
        operationSymbol = '÷';
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

    if (saveToHistory) {
      const calculation = `${previousValue} ${operationSymbol} ${currentValue} = ${result}`;
      setHistory(prev => [calculation, ...prev].slice(0, 10)); // Keep last 10 items
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

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return {
    currentValue,
    history,
    showHistory,
    clear,
    clearHistory,
    deleteLastChar,
    addDigit,
    addDecimal,
    selectOperation,
    equals,
    handlePercentage,
    handleSquareRoot,
    toggleHistory,
  };
};