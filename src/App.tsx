import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [displayedColor, setDisplayedColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | undefined>(undefined);
  const [playAgain, setPlayAgain] = useState<boolean>(false);

  const hexStr = "123456789ABCDEF";
  const hexDigits = hexStr.split("");

  const getHexCode = () => {
    let colorHex = new Array(6)
      .fill("")
      .map(() => hexDigits[Math.floor(Math.random() * hexDigits.length)])
      .join("");
    return `#${colorHex}`;
  };

  useEffect(() => {
    const correctColor = getHexCode();
    setDisplayedColor(correctColor);
    setAnswers([correctColor, getHexCode(), getHexCode()].sort());
    setPlayAgain(false);
  }, [playAgain]);

  const renderBtn = answers.map((answer) => {
    if (answer === displayedColor) {
      return (
        <button
          key={answer}
          onClick={() => {
            setResult(true);
            setPlayAgain(true);
          }}
        >
          {answer}
        </button>
      );
    } else {
      return (
        <button key={answer} onClick={() => setResult(false)}>
          {answer}
        </button>
      );
    }
  });

  return (
    <div className="App">
      <div className="color_box" style={{ backgroundColor: displayedColor }} />
      <div className="btn_container">{renderBtn}</div>
      {result === true && <div className="correct">Correct</div>}
      {result === false && <div className="incorrect">Try Again</div>}
    </div>
  );
}

export default App;
