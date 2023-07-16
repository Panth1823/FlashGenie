// import { useState } from "react";


// export default function App() {

//   const [quiz, setQuiz] = useState('');
//   const [response, setResponse] = useState(null);

//   const handleMessageChange = (e) => {
//     setQuiz(e.target.value)
//   }

//   const submitHandler = async (event) => {
//     event.preventDefault();
    
  
     
//     const response = await fetch('http://localhost:5000/quiz',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//        quiz
//       })
//     }
//     )
//     const res = await response.json();
//     console.log(res.flashcards)
//   };
  

//   return (
//     <div className="pt-20">

//         <div className="text-center font-bold font-serif text-lg ">
//            FlashCard
//         </div>  

//         <div className="flex justify-center items-center pt-2 ">
//                     <div className="w-full max-w-md px-4 border-teal-300 border-2 shadow-md rounded-md">
//                         <form onSubmit={submitHandler}>
//                             <div className="flex items-center pt-5">
//                                 <input
//                                     type='text'
//                                     value={quiz}
//                                     onChange={handleMessageChange}
//                                     className="rounded-md bg-gray-100 py-2 px-4 w-full"
//                                 />
//                             </div>
//                             <div className="flex justify-center pt-4">
//                                 <button className="text-center font-sans bg-teal-400 w-28 h-10 text-white rounded "
//                                     type='submit'>
//                                     Send
//                                 </button>
//                             </div>
//                             <div className='pt-5 relative overflow-hidden pb-[56.25%]'>
                                
//                             </div>
//                         </form>

//                     </div>


//                 </div>
//     </div>
//   )
// }

//NEW CODE
import { useState } from "react";
import CardFlip from "react-card-flip";

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card">
      <CardFlip isFlipped={isFlipped}>
        <div
          className="card-front bg-gray-100 flex items-center justify-center text-lg font-semibold"
          onClick={handleClick}
        >
          {question}
        </div>
        <div
          className="card-back bg-gray-200 flex items-center justify-center"
          onClick={handleClick}
        >
          <div className="text-lg font-semibold">{answer}</div>
        </div>
      </CardFlip>
    </div>
  );
};

export default function App() {
  const [quiz, setQuiz] = useState("");
  const [response, setResponse] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const handleMessageChange = (e) => {
    setQuiz(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quiz,
      }),
    });

    const res = await response.json();
    setFlashcards(res.flashcards);
  };

  return (
    <div className="pt-20">
      <div className="text-center font-bold font-serif text-lg">
        FlashCard
      </div>

      <div className="flex justify-center items-center pt-2">
        <div className="w-full max-w-md px-4 border-teal-300 border-2 shadow-md rounded-md">
          <form onSubmit={submitHandler}>
            <div className="flex items-center pt-5">
              <input
                type="text"
                value={quiz}
                onChange={handleMessageChange}
                className="rounded-md bg-gray-100 py-2 px-4 w-full"
              />
            </div>
            <div className="flex justify-center pt-4">
              <button
                className="text-center font-sans bg-teal-400 w-28 h-10 text-white rounded"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
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
    </div>
  );
}
