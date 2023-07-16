import "./card.css";
import "./flip-transition.css";

function Card({onClick}) {
  return (
    <>
    <div className="card shadow-2xl mt-20 " onClick={onClick}>
      <div className="card-back font-mono text-2xl text-white rounded-lg p-5 ">Delhi</div>
      <div className="card-front font-mono text-2xl text-white rounded-lg p-5 w-60 h-96 ">What is the Capital of India?</div>
    </div>
    <div>
    <div className="Button justify-between ml-56 w-max">
  <button className="bg-blue-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl">
    Prev
  </button>
  <button className="bg-blue-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl  ml-28 mt-5">
    Next
  </button>
</div>
      </div>
      </>
  
  );
}

export default Card;
