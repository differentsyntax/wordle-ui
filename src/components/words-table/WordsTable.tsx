import { GuessedWord } from "../main-container/MainContainer";
import "./WordsTable.css";

type WordsTableProps = {
  guessedWords: GuessedWord[];
  wordLength: number;
};

const WordsTable: React.FC<WordsTableProps> = ({
  guessedWords,
  wordLength,
}) => {
  const getBackgroundColor = (feedback: string) => {
    switch (feedback) {
      case "correct":
        return "#28A745";
      case "wrong-place":
        return "#FFC107";
      default:
        return "#FF5733";
    }
  };
  return (
    <div className="words-table">
      <table>
        <tbody>
          {guessedWords.map((item, index) => (
            <tr key={index}>
              {item.word.split("").map((char, idx) => (
                <td
                  key={idx}
                  style={{
                    backgroundColor: getBackgroundColor(item.feedback[idx]),
                    color: "black",
                  }}
                >
                  {char}
                </td>
              ))}
            </tr>
          ))}
          {Array(wordLength + 1 - guessedWords.length)
            .fill(" ".repeat(wordLength))
            .map((placeholder, index) => (
              <tr key={`placeholder-${index}`}>
                {placeholder.split("").map((char: string, idx: number) => (
                  <td key={idx}>{char}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
