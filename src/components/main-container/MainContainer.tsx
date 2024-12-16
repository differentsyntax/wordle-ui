import { useState } from "react";
import { ClipLoader } from "react-spinners";
import "./MainContainer.css";
import WordsTable from "./../words-table/WordsTable";

export type GuessedWord = {
  word: string;
  validity: string[];
};

const wordleUrl = import.meta.env.VITE_API_BASE_URL;
const validWordUrl = import.meta.env.VITE_API_VALID_WORD;

const MainContainer = () => {
  const [displayWordTable, setDisplayWordTable] = useState(false);
  const [wordLength, setWordLength] = useState(5);
  const [targetWord, setTargetWord] = useState("");
  const [turn, setTurn] = useState(1);
  const [currGuess, setCurrGuess] = useState("");
  const [guessedWords, setGuessedWords] = useState<GuessedWord[]>([]);
  const [gameStatus, setGameStatus] = useState("");
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const updateNewGuess = async (guessWord: string) => {
    setLoading(true);
    try {
      let res = await fetch(`${validWordUrl}/${guessWord}`);
      if (!res.ok) {
        setError(true);
        console.error("Invalid Word");
        setErrorMessage("Invalid Word");
      } else {
        res = await fetch(`${wordleUrl}/${gameId}/guess`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ guess: guessWord }),
        });

        if (!res.ok) {
          setError(true);
          console.error("Failed to submit guess");
          setErrorMessage("Failed to submit guess. Try again!");
        }

        const data = await res.json();
        const isWin = data.validity.every(
          (validity: string) => validity === "correct"
        );

        setGuessedWords((prev) => [
          ...prev,
          { word: guessWord, validity: data.validity },
        ]);

        if (isWin) {
          setGameStatus("won");
        } else if (turn > wordLength) {
          setGameStatus("lost");
        } else {
          setTurn((prev) => prev + 1);
          setCurrGuess("");
        }
      }
    } catch (error) {
      setError(true);
      console.error("Error submitting guess:", (error as Error).message);
      setErrorMessage("Error submitting the guess. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleNewGame = async () => {
    setError(false);
    setErrorMessage("");
    setLoading(true);
    try {
      const res = await fetch(wordleUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wordLength }),
      });

      if (!res.ok) {
        setError(true);
        console.error("Failed to start a new game! Try again!");
        setErrorMessage("Failed to start a new game! Try again");
      } else {
        const data = await res.json();
        setGameId(data.gameId);
        setTargetWord(data.targetWord);
        setGuessedWords([]);
        setTurn(1);
        setCurrGuess("");
        setGameStatus("");
        setDisplayWordTable(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error starting new game:", (error as Error).message);
      setErrorMessage("Error starting new game. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const renderStartInput = () => {
    return (
      <div>
        <div className="action-buttons">
          <h5>{`Choose word length:`}</h5>
          <select
            className="start-game-length-select"
            value={wordLength}
            onChange={(e) => setWordLength(Number(e.target.value))}
          >
            {[5, 6, 7, 8].map((length) => (
              <option key={length} value={length}>
                {length}
              </option>
            ))}
          </select>
        </div>
        <div className="action-buttons">
          <button className="start-game-button" onClick={handleNewGame}>
            {`Play New`}
          </button>
        </div>
      </div>
    );
  };

  const renderErrorOrLoading = () => {
    return (
      <>
        {error && <p className="error-message">{`${errorMessage}`}</p>}
        {loading && (
          <ClipLoader
            color="#3498db"
            loading={loading}
            size={30}
            className="loading-spinner"
          />
        )}
      </>
    );
  };

  const renderGuessInput = () => {
    if (gameStatus === "won") return <h3>{`You Won!`}</h3>;
    if (gameStatus === "lost")
      return <h3>{`You Lost! The word is ${targetWord}.`}</h3>;
    return (
      <>
        <h5>{`What's your guess?`}</h5>
        <input
          className="guess-input"
          type="text"
          value={currGuess}
          onChange={(e) => {
            if (e.target.value.length <= wordLength)
              setCurrGuess(e.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            setError(false);
            setErrorMessage("");
            updateNewGuess(currGuess);
          }}
          className="submit-guess-button"
          disabled={currGuess.length !== wordLength}
        >
          {`Submit`}
        </button>
      </>
    );
  };

  return (
    <div className="main-container">
      <h1 className="header-wordle">{`WORDLE`}</h1>

      {displayWordTable ? (
        <>
          <WordsTable wordLength={wordLength} guessedWords={guessedWords} />
          {renderErrorOrLoading()}
          {renderGuessInput()}
        </>
      ) : (
        <>
          {renderErrorOrLoading()}
          {renderStartInput()}
        </>
      )}
    </div>
  );
};

export default MainContainer;
