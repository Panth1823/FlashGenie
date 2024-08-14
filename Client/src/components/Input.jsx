import React from "react";
import PropTypes from "prop-types"; // Add PropTypes import
import { FiArrowRight } from "react-icons/fi";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
const Input = ({
  quiz,
  handleMessageChange,
  submitHandler,
  error,
  loading,
}) => {
  const COLORS_TOP = ["#00BFFF", "#1E90FF"];
  const color = useMotionValue(COLORS_TOP[0]);
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
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
                className="block p-2.5 w-full text-sm capitalize text-black font-bold h-20 bg-gray-50 rounded-xl resize-none border dark:bg-gray-700 outline-none"
                placeholder="Who painted the Mona Lisa?"
                required
              />
            </div>
            <div className="flex justify-center p-5">
              <motion.button
                style={{
                  border,
                  boxShadow,
                }}
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
              >
                Generate
              </motion.button>
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
