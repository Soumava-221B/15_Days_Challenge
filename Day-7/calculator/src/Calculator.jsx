import { useCalculator } from "./CalculatorLogic";

const Calculator = () => {
  const {
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
  } = useCalculator();

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        clear();
        break;
      case '⌫':
        deleteLastChar();
        break;
      case '%':
        handlePercentage();
        break;
      case '√':
        handleSquareRoot();
        break;
      case '÷':
      case 'x':
      case '-':
      case '+':
        selectOperation(value);
        break;
      case '=':
        equals();
        break;
      case '.':
        addDecimal();
        break;
      default:
        if (/\d/.test(value)) {
          addDigit(value);
        }
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl">
      <div className="bg-gray-100 p-3 text-right text-6xl rounded-xl mb-6 shadow-sm overflow-x-auto">
        {currentValue}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <button 
          onClick={() => handleButtonClick('C')} 
          className="btn-default bg-red-100 text-red-400"
        >
          C
        </button>
        <button 
          onClick={() => handleButtonClick('⌫')} 
          className="btn-default bg-gray-200 text-gray-700"
        >
          ⌫
        </button>
        <button 
          onClick={() => handleButtonClick('%')} 
          className="btn-default"
        >
          %
        </button>
        <button 
          onClick={() => handleButtonClick('√')} 
          className="btn-default"
        >
          √
        </button>
        <button 
          onClick={() => handleButtonClick('7')} 
          className="btn-default"
        >
          7
        </button>
        <button 
          onClick={() => handleButtonClick('8')} 
          className="btn-default"
        >
          8
        </button>
        <button 
          onClick={() => handleButtonClick('9')} 
          className="btn-default"
        >
          9
        </button>
        <button 
          onClick={() => handleButtonClick('÷')} 
          className="btn-default bg-orange-400 text-white"
        >
          ÷
        </button>
        <button 
          onClick={() => handleButtonClick('4')} 
          className="btn-default"
        >
          4
        </button>
        <button 
          onClick={() => handleButtonClick('5')} 
          className="btn-default"
        >
          5
        </button>
        <button 
          onClick={() => handleButtonClick('6')} 
          className="btn-default"
        >
          6
        </button>
        <button 
          onClick={() => handleButtonClick('x')} 
          className="btn-default bg-orange-400 text-white"
        >
          x
        </button>
        <button 
          onClick={() => handleButtonClick('1')} 
          className="btn-default"
        >
          1
        </button>
        <button 
          onClick={() => handleButtonClick('2')} 
          className="btn-default"
        >
          2
        </button>
        <button 
          onClick={() => handleButtonClick('3')} 
          className="btn-default"
        >
          3
        </button>
        <button 
          onClick={() => handleButtonClick('-')} 
          className="btn-default bg-orange-400 text-white"
        >
          -
        </button>
        <button 
          onClick={() => handleButtonClick('0')} 
          className="btn-default col-span-2 aspect-auto"
        >
          0
        </button>
        <button 
          onClick={() => handleButtonClick('.')} 
          className="btn-default"
        >
          .
        </button>
        <button 
          onClick={() => handleButtonClick('+')} 
          className="btn-default bg-orange-400 text-white"
        >
          +
        </button>
        <button 
          onClick={() => handleButtonClick('=')} 
          className="btn-default bg-green-400 text-white col-span-2 aspect-auto"
        >
          =
        </button>
        <button 
          onClick={toggleHistory}
          className="btn-default text-2xl bg-blue-400 text-white col-span-2 aspect-auto"
        >
          {showHistory ? 'Hide' : 'History'}
        </button>
      </div>

      {showHistory && (
        <div className="bg-white p-5 rounded-2xl flex-1 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Calculation History</h2>
            <button 
              onClick={clearHistory} 
              className="btn-default bg-red-100 text-red-400 text-sm py-1 px-2"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.length > 0 ? (
              history.map((item, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded">
                  <p className="text-gray-800">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No history yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;