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

// Updated to only include shades of blue
const COLORS_TOP = ["#00BFFF", "#1E90FF"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const [quiz, setQuiz] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loader

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
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Transform Learning with AI-Powered Flashcards
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
      <Input
        quiz={quiz}
        handleMessageChange={handleMessageChange}
        submitHandler={submitHandler}
        error={error}
        loading={loading}
      />
      <FlashcardGrid flashcards={flashcards} />
    </motion.section>
  );
};
