# AI Flashcard Generator Web App Documentation

The AI Flashcard Generator Web App is a user-friendly tool that allows users to input text, documents, or images and converts them into interactive flashcards. The app is designed to enhance learning and retention abilities, providing an adaptive learning experience to optimize memorization. This documentation provides an overview of the app's features, installation instructions, and usage guidelines.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Contributers](#contributers)

## Features

- **Input Content:** Users can input text, upload documents, or add images as content for flashcard generation.
- **Flashcard Generation:** The app uses OpenAI API to convert the input content into interactive flashcards.
- **Adaptive Learning:** After reviewing each flashcard, users can rate their retention. Low-rated flashcards are converted into simpler sub-flashcards to facilitate better comprehension and retention.
- **User-Friendly Interface:** The app features an intuitive and easy-to-navigate interface for a seamless user experience.
- **Mobile Compatibility:** The web app is responsive and compatible with mobile devices for on-the-go learning.
- **Integration with Learning Management Systems:** The app supports integration with popular Learning Management Systems (LMS) for easy incorporation into educational environments.
- **Collaboration Features:** Users can share flashcards and collaborate with peers for a collaborative learning experience.
- **Premium Subscription:** The freemium model offers basic features for free, while a premium subscription provides access to advanced features like unlimited flashcards and personalized learning plans.

## Tech Stack

- Frontend: React JS
- Backend: Express JS
- Server: Node JS
- External API: OpenAI API for flashcard generation

## Installation

1. Clone the repository to your local machine.

```bash
git clone https://github.com/NirbhaySirsikar/AI_flashcard_generator.git
```

2. Navigate to the project directory.

```bash
cd AI_flashcard_generator
```

3. Install the required dependencies.

```bash
npm install
```

4. Start the development server.

```bash
npm start
```

The app should now be running on `http://localhost:3000`.

## Usage

1. Access the app through the provided URL or locally on `http://localhost:3000`.
2. Input your desired content in the provided text area, upload documents, or add images.
3. Click the "Generate Flashcards" button to convert the input content into interactive flashcards.
4. Review the flashcards and rate your retention on a scale of 1 to 10 after each flashcard.
5. For low-rated flashcards (3 or below), the app will automatically convert them into simpler sub-flashcards.
6. Explore other features like collaboration, sharing, and the premium subscription for additional benefits.

## Contributing

We welcome contributions from the community! To contribute to the Flashcard Generator Web App, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Test your changes to ensure they work as expected.
5. Submit a pull request to the main repository.

## Contributers
* Nirbhay Sirsikar
* Panth Shah
* Aaron Verghis John
* Siddhant Daryanani
* Dhruv Patel
