// src/components/Flashcard.jsx
import { useState } from "react";
import CardFlip from "react-card-flip";

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-lg w-full p-4">
      <div className="card rounded-xl overflow-hidden bg-white cursor-pointer">
        <CardFlip isFlipped={isFlipped}>
          <div
            className="card-front bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center text-lg font-semibold py-24 px-8"
            onClick={handleClick}
          >
            {question}
          </div>
          <div
            className="card-back bg-gradient-to-r from-amber-500 to-pink-500 text-white flex items-center justify-center py-24 px-8"
            onClick={handleClick}
          >
            <div className="text-lg font-semibold">{answer}</div>
          </div>
        </CardFlip>
      </div>
    </div>
  );
};

export default Flashcard;
