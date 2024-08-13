const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const { CohereClient } = require('cohere-ai');
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
});

app.post("/quiz", async (req, res) => {
    const { quiz } = req.body;
    console.log(`Received quiz: ${quiz}`);

    const prompt = `Generate more than 3 flashcards for "${quiz}" in the JSON format only like {
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
    }`;

    try {
        const response = await cohere.chat({
            message: prompt
        });


        // Check response structure and parse it correctly
        if (response && response.text) {
            const flashcards = JSON.parse(response.text);
            if (flashcards.flashcards && Array.isArray(flashcards.flashcards)) {
                console.log('Parsed flashcards:', flashcards);
                res.json(flashcards); // Send parsed JSON response
            } else {
                throw new Error("Unexpected response format");
            }
        } else {
            throw new Error("Unexpected response structure");
        }
    } catch (error) {
        console.error("Error generating quiz:", error);
        res.status(500).json({ error: "An error occurred while generating the quiz." });
    }
});

app.listen(5000, () => console.log('Server is running on port 5000'));
