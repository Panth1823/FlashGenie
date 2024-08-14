import { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import Navbar from "./Navbar";

const Home = () => {
  const [quiz, setQuiz] = useState("");
  const [response, setResponse] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);

  const handleMessageChange = (e) => {
    setQuiz(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quiz }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.flashcards && Array.isArray(data.flashcards)) {
        setFlashcards(data.flashcards);
        setError(null);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while generating the quiz.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center mt-52">
        <div className="w-1/2 px-4 border-2 rounded-xl bg-slate-900 h-auto shadow-2xl">
          <form onSubmit={submitHandler}>
            <div className="flex items-center pt-5">
              <textarea
                type="text"
                value={quiz}
                onChange={handleMessageChange}
                className="block p-2.5 w-full text-sm text-black font-bold h-20 bg-gray-50 rounded-xl resize-none border dark:bg-gray-700"
                placeholder="Enter your text here..."
                required
              />
            </div>
            <div className="flex justify-center pt-5">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                <span className="relative p-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Generate
                </span>
              </button>
            </div>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
        </div>
      </div>

      <div className="pt-5 grid grid-cols-3 gap-4">
        {flashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            question={flashcard.question}
            answer={flashcard.answer}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
