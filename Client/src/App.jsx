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
// import { useState } from "react";
// import CardFlip from "react-card-flip";

// const Flashcard = ({ question, answer }) => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleClick = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <div className="card">
//       <CardFlip isFlipped={isFlipped}>
//         <div
//           className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 "
//           onClick={handleClick}
//         >
//           {question}
//         </div>
//         <div
//           className="card-back bg-gray-200 flex items-center justify-center"
//           onClick={handleClick}
//         >
//           <div className="relative p-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-lg font-semibold">{answer}</div>
//         </div>
//       </CardFlip>
//     </div>
//   );
// };

// export default function App() {
//   const [quiz, setQuiz] = useState("");
//   const [response, setResponse] = useState(null);
//   const [flashcards, setFlashcards] = useState([]);

//   const handleMessageChange = (e) => {
//     setQuiz(e.target.value);
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();

//     const response = await fetch("http://localhost:5000/quiz", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         quiz,
//       }),
//     });

//     const res = await response.json();
//     setFlashcards(res.flashcards);
//   };

//   return (
//     <div className="pt-20">
//       <div className="text-center font-bold font-serif text-lg">
//         FlashCard
//       </div>

//       <div className="flex justify-center items-center pt-2">
//         <div className="w-full max-w-md px-4 border-teal-300 border-2 shadow-md rounded-md">
//           <form onSubmit={submitHandler}>
//             <div className="flex items-center pt-5">
//               <input
//                 type="text"
//                 value={quiz}
//                 onChange={handleMessageChange}
//                 className="rounded-md bg-gray-100 py-2 px-4 w-full"
//               />
//             </div>
//             <div className="flex justify-center pt-4">
//               <button
//                 className="text-center font-sans bg-teal-400 w-28 h-10 text-white rounded"
//                 type="submit"
//               >
//                 Send
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <div className="pt-5 grid grid-cols-3 gap-4">
//         {flashcards.map((flashcard) => (
//           <Flashcard
//             key={flashcard.id}
//             question={flashcard.question}
//             answer={flashcard.answer}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }






import { useState } from "react";
import CardFlip from "react-card-flip";

const Flashcard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="max-w-lg w-full p-4">
      <div className="card rounded-lg overflow-hidden bg-white">
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
    // const res = {
    //   "flashcards": [
    //     {
    //       "id": 1,
    //       "question": "What is the capital of France?",
    //       "answer": "Paris"
    //     },
    //     {
    //       "id": 2,
    //       "question": "Who painted the Mona Lisa?",
    //       "answer": "Leonardo da Vinci"
    //     },
    //     {
    //       "id": 3,
    //       "question": "What is the chemical symbol for gold?",
    //       "answer": "Au"
    //     }
    //   ]
    // };
    setFlashcards(res.flashcards);
  };

  return (
    <div className="pt-20">
      <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-2xl">
        <div class=" flex flex-wrap items-center  mx-auto p-4">
          <a href="/" class="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AI Flashcard</span>
          </a>
          <div class="flex md:order-2">


          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            </ul>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center pt-10">
        <div className=" w-1/2 px-4 border-2 rounded-xl bg-slate-900 h-auto  shadow-2xl">
          <form onSubmit={submitHandler}>
            <div className="flex items-center pt-5">
              <textarea
                type="text required"
                value={quiz}
                onChange={handleMessageChange}
                className="block p-2.5 w-full text-sm text-white font-mono h-20 bg-gray-50 rounded-lg border dark:bg-gray-700  "
                placeholder="Enter your text here..."
                required />
            </div>
            <div className="flex justify-center pt-5">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 ">
                <span className="relative p-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Generate
                </span>
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
