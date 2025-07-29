import { Award, Clock, RefreshCw, Target, Trophy } from "lucide-react";

interface ResultsProps {
  score: number;
  totalQuestions: number;
  timeLeft: number;
  onRestart: () => void;
}

const Results = ({
  score,
  totalQuestions,
  timeLeft,
  onRestart,
}: ResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const timeUsed = 300 - timeLeft;
  const minutesUsed = Math.floor(timeUsed / 60);
  const secondsUsed = timeUsed % 60;

  let performanceMessage = "";
  if (percentage >= 80) {
    performanceMessage = "Excellent! You're a React expert!";
  } else if (percentage >= 60) {
    performanceMessage = "Good job! You know React well!";
  } else if (percentage >= 40) {
    performanceMessage = "Not bad! Keep learning!";
  } else {
    performanceMessage = "Keep practicing! You'll get better!";
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
              percentage >= 80
                ? "bg-green-100 text-green-600"
                : percentage >= 60
                ? "bg-blue-100 text-blue-600"
                : percentage >= 40
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <Trophy className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Quiz Completed!</h1>
          <p className="text-2xl font-semibold mb-6">{performanceMessage}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-800 mb-2">
              {score} / {totalQuestions}
            </div>
            <div className="text-blue-600 font-medium">Questions Correct</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-800 mb-2">
              {percentage}%
            </div>
            <div className="text-purple-600 font-medium">Score Percentage</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-800 mb-2">
              {minutesUsed}:{secondsUsed < 10 ? `0${secondsUsed}` : secondsUsed}
            </div>
            <div className="text-green-600 font-medium">Time Used</div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold text-lg cursor-pointer"
        >
          <RefreshCw size={24} className="pr-2" />
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default Results;
