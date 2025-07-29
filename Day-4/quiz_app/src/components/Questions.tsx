import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface QuestionsProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isLastQuestion: boolean;
  onFinish: () => void;
}

const Questions = ({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrev,
  isLastQuestion,
  onFinish,
}: QuestionsProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {question.question}
          </h2>

          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => onAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {selectedAnswer !== null && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-blue-800 font-medium">Explanation:</p>
                <p className="text-blue-700 mt-1">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            onClick={onPrev}
            disabled={selectedAnswer === null}
          >
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>

          {isLastQuestion ? (
            <button
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              onClick={onFinish}
              disabled={selectedAnswer === null}
            >
              <span>Finish Quiz</span>
            </button>
          ) : (
            <button
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              onClick={onNext}
              disabled={selectedAnswer === null}
            >
              <span>Next</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
