import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, BookOpen, AlertTriangle } from 'lucide-react';

const questions = [
  {
    question: 'Solve the quadratic equation x²−5x+6=0.',
    options: ['x=2,3', 'x=−2,−3', 'x=1,6', 'x=−1,−6'],
    correctAnswer: 'x=2,3'
  },
  {
    question: 'What is the area of a triangle with a base of 6 units and a height of 4 units?',
    options: ['12 square units', '24 square units', '8 square units', '16 square units'],
    correctAnswer: '12 square units'
  },
  {
    question: 'Find the derivative of f(x)=3x²+5x.',
    options: ['6x+5', '3x+5', '6x', '5x'],
    correctAnswer: '6x+5'
  },
  {
    question: 'What is the acceleration of a car that increases its velocity from 20 m/s to 30 m/s in 5 seconds?',
    options: ['2 m/s²', '5 m/s²', '10 m/s²', '1 m/s²'],
    correctAnswer: '2 m/s²'
  },
  {
    question: 'What is the focal length of a lens with a power of +2 diopters?',
    options: ['0.5 meters', '2 meters', '1 meter', '0.2 meters'],
    correctAnswer: '0.5 meters'
  },
  {
    question: 'What is the atomic number of Carbon?',
    options: ['6', '12', '14', '8'],
    correctAnswer: '6'
  },
  {
    question: 'Which type of bond is present in water (H₂O)?',
    options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
    correctAnswer: 'Covalent'
  },
  {
    question: 'What is the basic unit of heredity?',
    options: ['Cell', 'Gene', 'Chromosome', 'DNA'],
    correctAnswer: 'Gene'
  },
  {
    question: 'Which organ is responsible for pumping blood throughout the body?',
    options: ['Liver', 'Kidney', 'Heart', 'Lung'],
    correctAnswer: 'Heart'
  },
  {
    question: 'What is the output of the following Python code: print(2**3)?',
    options: ['6', '8', '9', '7'],
    correctAnswer: '8'
  },
  {
    question: 'Which data structure uses LIFO (Last In, First Out) principle?',
    options: ['Queue', 'Stack', 'Linked List', 'Array'],
    correctAnswer: 'Stack'
  },
  {
    question: 'What is the unit of electrical resistance?',
    options: ['Ampere', 'Ohm', 'Volt', 'Watt'],
    correctAnswer: 'Ohm'
  },
  {
    question: 'What is the SI unit of pressure?',
    options: ['Pascal', 'Newton', 'Joule', 'Watt'],
    correctAnswer: 'Pascal'
  },
  {
    question: 'What is the process of transferring heat through a solid material called?',
    options: ['Convection', 'Conduction', 'Radiation', 'Insulation'],
    correctAnswer: 'Conduction'
  },
  {
    question: 'What is the probability of rolling a sum of 7 with two six-sided dice?',
    options: ['1/6', '1/12', '1/36', '5/36'],
    correctAnswer: '1/6'
  },
];
export default function TakeQuiz() {
  const [isReady, setIsReady] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(30 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            setShowResults(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const handleReadyClick = () => {
    setIsReady(true);
    setTimerActive(true);
  };

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestionIndex(index);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-800"> {/* Updated background class */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/profile" className="text-amber-400 hover:text-amber-300 transition-colors">
              EduCounsel
            </Link>
            <span className="text-white ml-2">Quiz</span>
          </h1>
          {isReady && !showResults && (
            <div className="text-xl font-semibold flex items-center">
              <Clock className="mr-2" />
              {formatTime(timer)}
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-800 to-indigo-800 p-6 text-white">
            <h2 className="text-3xl font-bold">Entrance Exam</h2>
            <p className="mt-2 text-blue-200">Test your knowledge across various subjects</p>
          </div>

          {!isReady ? (
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Are You Ready to Take the Quiz?</h3>
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 text-left" role="alert">
                <p className="font-bold mb-2">Guidelines:</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>The quiz contains 15 multiple-choice questions.</span>
                  </li>
                  <li className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>You have 30 minutes to complete the quiz.</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Answer all questions to the best of your ability.</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>You can navigate between questions using the number buttons.</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Unanswered questions are highlighted in red, answered in green.</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>You can review and change your answers before submitting.</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>You can only submit once. Double-check your answers before finishing.</span>
                  </li>
                  <li className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0" />
                    <span>Be honest and do not use any external help or resources.</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleReadyClick}
                className="bg-amber-400 text-gray-900 py-3 px-8 rounded-lg shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-lg font-semibold"
              >
                Start Quiz
              </button>
            </div>
          ) : showResults ? (
            <div className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Quiz Completed!</h3>
              <div className="text-6xl font-bold text-amber-400 mb-8">{calculateScore()} / {questions.length}</div>
              <p className="text-xl text-gray-700 mb-8">
                You answered {calculateScore()} out of {questions.length} questions correctly.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-amber-400 text-gray-900 py-3 px-8 rounded-lg shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition duration-300 ease-in-out text-lg font-semibold"
              >
                Retake Quiz
              </button>
            </div>
          ) : (
            <div className="p-8">
              <div className="flex flex-wrap justify-center mb-6">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`w-10 h-10 m-1 rounded-full flex items-center justify-center text-white font-semibold ${
                      selectedAnswers[index] === '' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Question {currentQuestionIndex + 1} / {questions.length}
                </h3>
                <p className="text-lg text-gray-700 mb-4">{questions[currentQuestionIndex].question}</p>
                <ul className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                          selectedAnswers[currentQuestionIndex] === option
                            ? 'border-indigo-600 bg-indigo-100'
                            : 'border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="bg-gray-300 text-gray-900 py-2 px-6 rounded-lg mr-4"
                  >
                    <ChevronLeft className="inline-block mr-2" /> Previous
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next <ChevronRight className="inline-block ml-2" />
                    </>
                  ) : (
                    'Submit Quiz'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
