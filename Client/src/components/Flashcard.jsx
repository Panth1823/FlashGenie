import { useState } from "react";
import CardFlip from "react-card-flip";

const Flashcard = ({ question, options, correctAnswer, updateScore }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleOptionClick = (option) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
      updateScore(option === correctAnswer);
    }
  };

  return (
    <div className="max-w-lg w-full p-4">
      <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className="card-side bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl shadow-xl p-6 h-64 flex items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
          <h2 className="text-2xl font-bold text-center">{question}</h2>
        </div>
        <div
          className="card-side bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl shadow-xl p-6 h-64 flex flex-col justify-center cursor-pointer"
          onClick={handleClick}
        >
          <div className="grid grid-cols-2 gap-2">
            {options && options.map((option, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
                className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedOption === option
                    ? option === correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-white text-purple-700 hover:bg-purple-100"
                } ${answered && option !== selectedOption ? "opacity-50" : ""}`}
                disabled={answered}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption && selectedOption !== correctAnswer && (
            <div className="mt-4 text-center text-sm">
              <span className="text-red-300 font-bold">
                Incorrect. The correct answer is: {correctAnswer}
              </span>
            </div>
          )}
        </div>
      </CardFlip>
    </div>
  );
};

export default Flashcard;
