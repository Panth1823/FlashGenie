import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Input from "./Input";
import FlashcardGrid from "./FlashcardGrid";
import SparklesText from "@/components/magicui/sparkles-text";

// Updated to only include shades of blue
const COLORS_TOP = ["#00BFFF", "#1E90FF"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [quiz, setQuiz] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const [showQuiz, setShowQuiz] = useState(false); // State to toggle visibility

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleMessageChange = (e) => {
    setQuiz(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loader

    try {
      const response = await fetch("http://127.0.0.1:8787/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quiz }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        // Check if data is an array
        if (Array.isArray(data)) {
          setFlashcards(data);
          setError(null);
        } else {
          throw new Error("Unexpected response format: data is not an array");
        }
      } else {
        throw new Error(`Unexpected content type: ${contentType}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        "An error occurred while generating the quiz. Please try again."
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleButtonClick = () => {
    setShowQuiz(true); // Show quiz inputs and flashcards
  };

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl text-center text-xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-white">
          Flip, Learn, and Level up with
          <SparklesText text="AI-Powered Flashcards" />
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Enhance learning efficiency with personalized flashcard quizzes.
        </p>
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
          onClick={handleButtonClick} // Show quiz form and flashcards on click
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          Try It Free
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      {/* Display loader when generating flashcards */}
      {loading ? (
        <div className="text-center mt-4">
          <p>Generating flashcards...</p>
        </div>
      ) : showQuiz ? (
        <>
          {/* Smooth transition for Input and FlashcardGrid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mt-8 z-50"
          >
            <Input
              quiz={quiz}
              handleMessageChange={handleMessageChange}
              submitHandler={submitHandler}
              error={error}
              loading={loading}
            />
            <FlashcardGrid flashcards={flashcards} />
          </motion.div>
        </>
      ) : null}{" "}
      {/* Only show quiz and flashcards after button click */}
    </motion.section>
  );
};
