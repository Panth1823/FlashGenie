import PropTypes from "prop-types";
import Flashcard from "./Flashcard";

const FlashcardGrid = ({ flashcards, score, setScore }) => {
  const updateScore = (isCorrect) => {
    setScore((prevScore) => ({
      correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
      total: prevScore.total + 1,
    }));
  };

  return (
    <div>
      <div className="p-5 lg:grid md:grid md:grid-cols-2 xl:grid grid-cols-3 gap-4 sm:flex">
        {flashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            question={flashcard.question}
            options={flashcard.options}
            correctAnswer={flashcard.correctAnswer}
            updateScore={updateScore}
          />
        ))}
      </div>
      <div className="mt-4 text-center text-xl font-bold">
        Score: {score.correct}/{score.total}
      </div>
    </div>
  );
};

FlashcardGrid.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
  score: PropTypes.shape({
    correct: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  setScore: PropTypes.func.isRequired,
};

export default FlashcardGrid;
