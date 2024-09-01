import PropTypes from "prop-types";
import Flashcard from "./Flashcard";

const FlashcardGrid = ({ flashcards }) => {
  return (
    <div className="p-5 lg:grid md:grid md:grid-cols-2 xl:grid grid-cols-3 gap-4 sm:flex ">
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
