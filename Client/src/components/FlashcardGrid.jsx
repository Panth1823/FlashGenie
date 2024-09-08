import PropTypes from "prop-types";
import Flashcard from "./Flashcard";

const FlashcardGrid = ({ flashcards }) => {
  return (
    <div className="p-5 lg:grid md:grid md:grid-cols-2 xl:grid grid-cols-3 gap-4 sm:flex ">
      {flashcards.length > 0 ? (
        flashcards.map((flashcard, index) => (
          <Flashcard
            key={index}
            question={flashcard.question}
            answer={flashcard.answer}
          />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

FlashcardGrid.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FlashcardGrid;
