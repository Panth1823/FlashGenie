import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageIcon } from "lucide-react";
import { Input as TextInput } from "@/components/ui/input";
import FlashcardGrid from "@/components/FlashcardGrid";

const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

const FlashcardInput = ({
  quiz,
  handleMessageChange,
  submitHandler,
  error,
}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [errorMessage, setError] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const COLORS_TOP = ["#00BFFF", "#1E90FF"];
  const color = useMotionValue(COLORS_TOP[0]);
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > IMAGE_MAX_SIZE) {
        setError("Image size cannot exceed 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setImageUploaded(true);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      await generateFlashcards();
    } else {
      submitHandler(event);
    }
  };

  const generateFlashcards = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!image) {
        throw new Error(
          "No image uploaded. Please upload an image to generate flashcards."
        );
      }

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imageData = {
        inlineData: {
          data: image.split(",")[1],
          mimeType: "image/jpeg",
        },
      };

      const result = await model.generateContent([
        `Generate 6 multiple-choice flashcards based on the content of the provided image. For each flashcard, provide a question, the correct answer, and three incorrect options. Format the response as follows:

      Flashcard 1:
      Question: [Question]
      Correct Answer: [Correct Answer]
      Incorrect Option 1: [Incorrect Option 1]
      Incorrect Option 2: [Incorrect Option 2]
      Incorrect Option 3: [Incorrect Option 3]

      Repeat this format for all 6 flashcards.`,
        imageData,
      ]);

      const responseText = await result.response.text();
      const flashcardsData = parseFlashcardsFromResponse(responseText);

      if (!flashcardsData || flashcardsData.length === 0) {
        throw new Error(
          "No valid flashcards found in the response. Please try a different image."
        );
      }

      setFlashcards(flashcardsData);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      setError(`Failed to generate flashcards: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const parseFlashcardsFromResponse = (responseText) => {
    const flashcards = [];
    const flashcardPattern =
      /Flashcard \d+:\nQuestion: (.*?)\nCorrect Answer: (.*?)\nIncorrect Option 1: (.*?)\nIncorrect Option 2: (.*?)\nIncorrect Option 3: (.*?)(?=\n\nFlashcard \d+:|$)/gs;

    let match;
    while ((match = flashcardPattern.exec(responseText)) !== null) {
      const [
        ,
        question,
        correctAnswer,
        incorrectOption1,
        incorrectOption2,
        incorrectOption3,
      ] = match;
      flashcards.push({
        id: flashcards.length + 1,
        question: question.trim(),
        answer: correctAnswer.trim(),
        options: shuffleArray([
          correctAnswer.trim(),
          incorrectOption1.trim(),
          incorrectOption2.trim(),
          incorrectOption3.trim(),
        ]),
        correctAnswer: correctAnswer.trim(),
      });
    }

    return flashcards.length > 0 ? flashcards : null;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      <div
        id="message-form"
        className="mx-auto w-full box-border max-w-[850px] text-center"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto flex flex-col gap-10"
        >
          <div className="flex flex-col gap-3">
            <div className="flex bg-gray-800 border border-gray-700 rounded-full overflow-hidden">
              <div className="w-[80%]">
                <TextInput
                  id="message"
                  rows="1"
                  value={quiz}
                  required={!image}
                  onChange={handleMessageChange}
                  placeholder="Generate flashcards about ancient Egyptian civilization?"
                  className="w-full h-full bg-transparent text-white placeholder:text-xs placeholder-gray-300 placeholder:lg:text-lg placeholder:sm:text-sm placeholder:md:text-base border-none focus:ring-0 rounded-none py-3 px-4 text-sm lg:text-lg md:text-base sm:text-sm focus:outline-none"
                />
              </div>
              <div className="w-[20%] border-l border-gray-700 relative">
                <div className="h-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="inset-0 h-full opacity-0 cursor-pointer w-full z-20"
                    id="image-upload"
                  />
                  <div
                    className="flex items-center justify-center transition-colors z-10 absolute top-0 left-0 w-full h-full cursor-pointer"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <ImageIcon
                      className={`w-6 h-6 ${
                        imageUploaded ? "text-green-500" : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              <p>
                Please keep your prompt concise. Longer prompts may lead to
                errors, and model accuracy is not guaranteed.
              </p>
            </div>
          </div>
          <motion.button
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.045 }}
            whileTap={{ scale: 0.985 }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 self-center"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </motion.button>
        </form>
        {flashcards.length > 0 && (
          <div>
            <FlashcardGrid
              flashcards={flashcards}
              score={score}
              setScore={setScore}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 pt-5">
          {error && <div className="text-red-500">{error}</div>}
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};

FlashcardInput.propTypes = {
  quiz: PropTypes.string.isRequired,
  handleMessageChange: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default FlashcardInput;
