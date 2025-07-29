import { useEffect, useState, useCallback } from "react";
import ProgressBar from "./ProgressBar";
import QuizStart from "./QuizStart";
import Questions from "./Questions";
import Timer from "./Timer";
import Results from "./Results";

const TOTAL_QUESTIONS = 8;
const QUIZ_TIME = 300;

const Quiz = () => {
  const [quizState, setQuizState] = useState<
    "start" | "in-progress" | "finished"
  >("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  );
  const [timerActive, setTimerActive] = useState(false);

  const questions = [
    {
      question: "What is React?",
      options: [
        "A framework",
        "A library",
        "A programming language",
        "A database",
      ],
      correctAnswer: 1,
      explanation:
        "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What is JSX?",
      options: [
        "A syntax extension for JavaScript",
        "A templating language",
        "A state management library",
        "A build tool",
      ],
      correctAnswer: 0,
      explanation:
        "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript.",
    },
    {
      question:
        "Which of the following command is used to create react-js-app?",
      options: [
        "npx create-react-app appname",
        "npm install create-react-app",
        "npx install create-react-app -g",
        "install - l create-react-app",
      ],
      correctAnswer: 0,
      explanation:
        "The correct syntax for installing react app is npx create-react-app appname where appname is the name of the app you want to create.",
    },
    {
      question:
        "In React.js which one of the following is used to create a class for Inheritance?",
      options: ["Create", "Extends", "Inherit", "Delete"],
      correctAnswer: 1,
      explanation:
        "The meaning of Extends in react.js is to create a class for the Inheritance. So the correct answer is Extends.",
    },
    {
      question: "Which of the following is must for the API in React.js?",
      options: [
        "SetinitialComponent",
        "renderComponent",
        "render",
        "All of the above",
      ],
      correctAnswer: 2,
      explanation:
        "The render method is required for React components. The other options are not valid React API methods.",
    },
    {
      question: "What is the default port number in which the application run?",
      options: ["3000", "8080", "5000", "3030"],
      correctAnswer: 0,
      explanation:
        "The default port number in which react application runs is 3000.",
    },
    {
      question: "Which of the following is a way to handle data in React.js?",
      options: [
        "State & Props",
        "Services & Components",
        "State & Services",
        "State & Component",
      ],
      correctAnswer: 0,
      explanation:
        "State and Props are ways to handle data in React.js where the state is mutable and props are unchangeable.",
    },
    {
      question: "Which of the following is true regarding Babel?",
      options: [
        "Compiler",
        "Transpiler",
        "Both of the above",
        "None of the above",
      ],
      correctAnswer: 2,
      explanation:
        "Babel is both a compiler and transpiler which is used to transform JavaScript code.",
    },
  ];

  useEffect(() => {
    let interval: number;

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            finishQuiz();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && quizState === "in-progress") {
      finishQuiz();
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, quizState]);

  const startQuiz = useCallback(() => {
    setQuizState("in-progress");
    setTimerActive(true);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = useCallback(() => {
    setTimerActive(false);
    setQuizState("finished");
  }, []);

  const restartQuiz = () => {
    setQuizState("start");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(QUIZ_TIME);
    setAnswers(Array(TOTAL_QUESTIONS).fill(null));
    setTimerActive(false);
  };

  if (quizState === "start") {
    return <QuizStart onStart={startQuiz} />;
  }

  if (quizState === "finished") {
    return (
      <Results
        score={score}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
        onRestart={restartQuiz}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <Timer timeLeft={timeLeft} />
            <ProgressBar
              current={currentQuestion + 1}
              total={questions.length}
              percentage={Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}
            />
          </div>
        </div>
      </div>

      <Questions
        question={questions[currentQuestion]}
        selectedAnswer={answers[currentQuestion]}
        onAnswer={handleAnswer}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        isLastQuestion={currentQuestion === questions.length - 1}
        onFinish={finishQuiz}
      />
    </div>
  );
};

export default Quiz;
