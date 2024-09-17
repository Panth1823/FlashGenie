import PropTypes from "prop-types";
import Flashcard from "./Flashcard";

const FlashcardGrid = ({ flashcards }) => {
  return (
    <div className="p-5 lg:grid md:grid md:grid-cols-2 xl:grid grid-cols-3 gap-4 sm:flex ">
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          question={flashcard.question}
          options={flashcard.options}
          correctAnswer={flashcard.correctAnswer}
        />
      ))}
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
};

export default FlashcardGrid;
