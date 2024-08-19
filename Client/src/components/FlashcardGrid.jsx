import PropTypes from "prop-types";
import Flashcard from "./Flashcard";

const FlashcardGrid = ({ flashcards }) => {
  return (
    <div className="p-5 grid grid-cols-3 gap-4">
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          question={flashcard.question}
          answer={flashcard.answer}
        />
      ))}
    </div>
  );
};

FlashcardGrid.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FlashcardGrid;
