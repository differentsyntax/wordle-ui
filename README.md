# [Wordle UI](https://wordle-ui.netlify.app/)

A React-based user interface for playing a Wordle-like game. This project provides a visually engaging and interactive frontend to guess words and track feedback based on user inputs.


<img width="620" alt="Screenshot 2024-12-15 at 4 00 23 PM" src="https://github.com/user-attachments/assets/fa753ba6-fd46-4f0b-b227-23c8aa460366" />




---

## Features

- **Dynamic Word Length Selection:** Choose the word length before starting a new game.
- **Real-time Feedback:** Color-coded feedback for each guess, indicating correctness, incorrect placement, or incorrect letters.
- **Game Status Indicators:** Clear messaging for game outcomes (win or lose).
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Spinner Animation:** Indicates loading states during game setup or guess submissions.

---

## Demo

[Live Demo Link](https://wordle-ui.netlify.app/)

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js:** Install [Node.js](https://nodejs.org/) (LTS recommended).
- **npm or Yarn:** Node Package Manager is required (comes with Node.js).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/differentsyntax/wordle-ui.git
   cd wordle-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in the browser:**
   The app will be running at [http://localhost:5173](http://localhost:5173).

---

## Usage

1. **Choose Word Length:**
   Select the desired word length using the dropdown menu.

2. **Start a New Game:**
   Click on "Play New" to start the game.

3. **Submit Guesses:**
   Enter your guess and click "Submit". Feedback will be displayed for each letter:
   - **Green:** Correct letter in the correct position.
   - **Yellow:** Correct letter in the wrong position.
   - **Red:** Incorrect letter.

4. **Game End:**
   - Win: All letters are guessed correctly.
   - Lose: Exceeded the maximum number of attempts.

---

## Project Structure

```plaintext
wordle-ui/
├── src/
│   ├── components/       # Reusable React components
│   ├── styles/           # CSS files
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point for React application
├── public/               # Static files
├── .env                  # Environment variables
├── vite.config.ts        # Vite configuration
├── package.json          # Project metadata and dependencies
```

---

## Technologies Used

- **React:** Frontend library for building the UI.
- **TypeScript:** For static typing and type safety.
- **Vite:** Lightning-fast development server and build tool.
- **CSS:** For styling the components.

---

## Environment Variables

The project uses the following environment variables:

```plaintext
VITE_API_BASE_URL="https://oygs3uv8y5.execute-api.us-west-2.amazonaws.com/prod/game"
VITE_API_VALID_WORD="https://api.dictionaryapi.dev/api/v2/entries/en"
```

Polite internet behavior only please!

### Setting Up

1. Create a `.env` file in the root directory.
2. Add the required environment variables.

Example:
```plaintext
VITE_API_URL=https://your-api-url.com
```

---

## Scripts

- **Start Development Server:**
  ```bash
  npm run dev
  ```
---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and push to your branch.
4. Open a pull request.

---

## Acknowledgments

- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html).
- Built with ❤️ using React and TypeScript.

