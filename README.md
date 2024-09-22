# FlashGenie

FlashGenie is a user-friendly web app that allows users to input text, documents, or images and converts them into interactive flashcards. Designed to enhance learning and retention, FlashGenie provides an adaptive learning experience to optimize memorization.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)

## Features

- **Input Content:** Users can input text, upload documents, or add images as content for flashcard generation.
- **Flashcard Generation:** FlashGenie uses **Cloudflare Workers AI (Mistral 7B)** for text-to-flashcard generation and **Google Gemini 1.5 Flash** for image-based flashcard generation.
- **Interactive MCQs:** The generated flashcards are presented in an engaging multiple-choice question (MCQ) format.
- **Image-to-Flashcard:** Users can upload images, and FlashGenie will generate flashcards using Google Gemini 1.5 Flash for image processing.
- **Error Handling:** The app includes robust error handling for API responses, including managing malformed JSON outputs.
- **User-Friendly Interface:** The app features an intuitive and easy-to-navigate interface.
- **Mobile Compatibility:** The web app is responsive and works on mobile devices for on-the-go learning.
- **Collaboration:** Users can share flashcards and collaborate with peers.

## Tech Stack

- **Frontend:** Vite, Tailwind CSS, Framer Motion, Magic UI, ShadCN
- **Backend:** Cloudflare Workers (Mistral 7B for text processing, Google Gemini 1.5 Flash for image processing)
- **Server:** Vercel for frontend deployment, Cloudflare Workers for serverless backend
- **External API:** Cloudflare Workers AI for text-based flashcard generation, Google Gemini 1.5 Flash for image-based flashcards

## Installation

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/Panth1823/FlashGenie.git
    ```

2. Navigate to the project directory.

    ```bash
    cd FlashGenie
    ```

3. Install the required dependencies for both the server and client.

    ```bash
    # For the server
    cd ./server
    npm install
    
    # For the client
    cd ./client
    npm install
    ```

4. Start the server.

    ```bash
    npm run dev or wrangler dev
    ```

5. Start the client in development mode.

    ```bash
    npm run dev
    ```

The server should now be running, and the client can be accessed at `http://localhost:5173`.

## Usage

1. Access the app through the provided URL or locally at `http://localhost:5173`.
2. Input your desired content in the provided text area or upload an image.
3. Click the "Generate" button to convert the input content into interactive flashcards or quizzes.

## Contributing

We welcome contributions from the community! To contribute to FlashGenie, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Test your changes to ensure they work as expected.
5. Submit a pull request to the main repository.




### ⭐ Don't forget to star the repository if you find it helpful!
