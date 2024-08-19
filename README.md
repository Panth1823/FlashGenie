# FlashGenie

FlashGenie is a user-friendly web app that allows users to input text, documents, or images and converts them into interactive flashcards. Designed to enhance learning and retention, FlashGenie provides an adaptive learning experience to optimize memorization.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Contributors](#contributors)

## Features

- **Input Content:** Users can input text, upload documents, or add images as content for flashcard generation.
- **Flashcard Generation:** FlashGenie uses Cloudflare Workers AI API to convert the input content into interactive flashcards.
- **Adaptive Learning:** Users can rate their retention after each flashcard. Low-rated flashcards are converted into simpler sub-flashcards for better comprehension.
- **User-Friendly Interface:** The app features an intuitive and easy-to-navigate interface.
- **Mobile Compatibility:** The web app is responsive and works on mobile devices for on-the-go learning.
- **LMS Integration:** Supports integration with popular Learning Management Systems (LMS) for seamless educational incorporation.
- **Collaboration:** Users can share flashcards and collaborate with peers.
- **Premium Subscription:** The freemium model offers basic features for free, while a premium subscription provides access to advanced features such as unlimited flashcards and personalized learning plans.

## Tech Stack

- **Frontend:** React JS
- **Backend:** Cloudflare Workers
- **Server:** Cloudflare
- **External API:** Cloudflare Workers AI API for flashcard generation

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
    npm run dev or wrangelr dev
    ```

5. Start the client in development mode.

    ```bash
    npm run dev
    ```

The server should now be running, and the client can be accessed at `http://localhost:5173`.

## Usage

1. Access the app through the provided URL or locally at `http://localhost:5173`.
2. Input your desired content in the provided text area.
3. Click the "Generate" button to convert the input content into interactive flashcards.

## Contributing

We welcome contributions from the community! To contribute to FlashGenie, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Test your changes to ensure they work as expected.
5. Submit a pull request to the main repository.

## Contributors

- Nirbhay Sirsikar
- Panth Shah
- Aaron Verghis John
- Siddhant Daryanani
- Dhruv Patel

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
