const Calculator = () => {
  return (
    <div className="bg-white p-5 rounded-2xl">
    <div className="bg-gray-100 p-3 text-right text-6xl rounded-xl mb-6 shadow-sm">0</div>
        <div className="grid grid-cols-4 gap-4">
        <button className="btn-default bg-red-100 text-red-400">C</button>
        <button className="btn-default">%</button>
        <button className="btn-default">√</button>
        <button className="btn-default bg-orange-400 text-white">÷</button>
        <button className="btn-default">1</button>
        <button className="btn-default">2</button>
        <button className="btn-default">3</button>
        <button className="btn-default bg-orange-400 text-white">x</button>
        <button className="btn-default">4</button>
        <button className="btn-default">5</button>
        <button className="btn-default">6</button>
        <button className="btn-default bg-orange-400 text-white">-</button>
        <button className="btn-default">7</button>
        <button className="btn-default">8</button>
        <button className="btn-default">9</button>
        <button className="btn-default bg-orange-400 text-white">+</button>
        <button className="btn-default col-span-2 aspect-auto">0</button>
        <button className="btn-default">.</button>
        <button className="btn-default bg-green-400 text-white">=</button>
        </div>
    </div>
  )
}

export default Calculator