import React from "react";
import PropTypes from "prop-types"; // Add PropTypes import
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
const Input = ({ quiz, handleMessageChange, submitHandler, error }) => {
  const COLORS_TOP = ["#00BFFF", "#1E90FF"];
  const color = useMotionValue(COLORS_TOP[0]);
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  return (
    <>
      <div
        id="message-form"
        className="mx-auto w-full box-border max-w-[850px] text-center "
      >
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6 relative message-wrapper justify-center ">
            <textarea
              type="text"
              id="message"
              rows="1"
              value={quiz}
              required
              onChange={handleMessageChange}
              placeholder="Generate flashcards about ancient egyptian civilization?"
              className="w-full bg-[var(--color-user-menu-hover)] border border-[var(--color-user-message-border)] rounded-2xl box-border p-[15px]  text-[var(--color-white)] font-inherit text-base outline-none placeholder:text-[var(--color-groupings)] resize-none placeholder:opacity-80"
            />
            <div className="text-[var(--color-disclaimer)] text-[0.7em] disclaimer">
              Please keep your prompt concise. Longer prompts may lead to errors, and model accuracy is not guaranteed.
            </div>
            <motion.button
              style={{
                border,
                boxShadow,
              }}
              whileHover={{
                scale: 1.045,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 self-center"
            >
              Generate
            </motion.button>

            <div className="w-full rounded-xl  h-auto shadow-2xl z-50">
              {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

Input.propTypes = {
  quiz: PropTypes.string.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default Input;
