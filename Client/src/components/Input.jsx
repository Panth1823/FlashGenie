import React from "react";
import PropTypes from "prop-types"; // Add PropTypes import

const Input = ({
  quiz,
  handleMessageChange,
  submitHandler,
  error,
  loading,
}) => {
  return (
    <>
      <div className="flex justify-center items-center mt-52 z-50">
        <div className="w-1/2 px-4 border-2 rounded-xl bg-slate-900 h-auto shadow-2xl">
          <form onSubmit={submitHandler}>
            <div className="flex items-center pt-5">
              <textarea
                type="text"
                value={quiz}
                onChange={handleMessageChange}
                className="block p-2.5 w-full text-sm capitalize text-black font-bold h-20 bg-gray-50 rounded-xl resize-none border dark:bg-gray-700"
                placeholder="Who painted the Mona Lisa?"
                required
              />
            </div>
            <div className="flex justify-center pt-5">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 mb-4 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
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
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

// Add PropTypes to validate props
Input.propTypes = {
  quiz: PropTypes.string.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default Input;
