const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { CohereClient } = require('cohere-ai');

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

app.post("/quiz", async (req, res) => {
    const { quiz } = req.body;
    console.log(`Received prompt: ${quiz}`);

    // Validate the prompt: reject if it's only numbers
    if (/^\d+$/.test(quiz)) {
        return res.status(400).json({ error: "An error occurred while generating the quiz. Prompt cannot be a number only." });
    }

    const prompt = `Generate more than 3 flashcards for the topic "${quiz}". Each flashcard should be in the following JSON format:

    {
        "flashcards": [
            {
                "id": 1,
                "question": "What is the capital of France?",
                "answer": "Paris"
            },
            {
                "id": 2,
                "question": "Who painted the Mona Lisa?",
                "answer": "Leonardo da Vinci"
            },
            {
                "id": 3,
                "question": "What is the chemical symbol for gold?",
                "answer": "Au"
            }
        ]
    }

    Ensure that the flashcards include diverse types of questions (e.g., multiple choice, true/false, etc.) and provide accurate and informative answers. The JSON should be valid and correctly formatted. If you cannot generate flashcards for the given topic, please provide an error message explaining why.`;

    try {
        const response = await cohere.chat({
            message: prompt
        });

        // Sanitize and clean the response
        let responseText = response.text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Attempt to parse the JSON
        let flashcards;
        try {
            flashcards = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error("Received invalid JSON response");
        }

        // Limit the length of the answer
        if (flashcards.flashcards && Array.isArray(flashcards.flashcards)) {
            flashcards.flashcards.forEach(card => {
                card.answer = card.answer.slice(0, 150); // Adjust this value as needed
            });

            console.log('Parsed flashcards:', flashcards);
            res.json(flashcards); // Send parsed JSON response
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        console.error("Error generating quiz:", error.message);
        res.status(500).json({ error: "An error occurred while generating the quiz." });
    }
});

app.listen(5000, () => console.log('Server is running on port 5000'));
