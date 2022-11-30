import { useState } from 'react';
import classNames from "classnames";

export default function AnswerListItem(props) {
  const [buttonClick, setButtonClick] = useState(0);
  const [buttonColour, setButtonColor] = useState(0);
  const [buttonMode, setButtonState] = useState(false);
  const playerCount = 6;
  // console.log(props.letter)
  // console.log(props.id)

  const alphaRows = classNames(
    props.captureColour,
    "alpha-item",
    { "letter-captured": props.captureColour },
    { "alpha2": props.id > 13 },
    { "alpha1": props.id <= 13 },
    { "results-phase": props.phase === "results" },
    {}
  );
  // const handleClick = () => setIntesity(intensity < 1 ? intensity + 0.1 : 0);

  const handleClick = () => {
    setButtonClick(buttonClick + 1);
    setButtonState(buttonClick < (playerCount / 2) - 1 ? false : true);
    if (!buttonMode) {
      setButtonColor(buttonColour < 1 ? buttonColour+ 0.1 *playerCount : 0)
    } else {
      setButtonColor(0)
    }
  };
  console.log(buttonClick);
  console.log(buttonColour);
  console.log(buttonMode);

  // console.log("click")
  return (
    <li className={alphaRows}>

      {props.phase === "game" && <h2>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2 >
          <button onClick={handleClick} disabled={buttonMode}
            style={{
              backgroundColor: 
              !buttonMode ? `rgba(255,0,0,${buttonColour})` : "#313e4454",
              fontSize: "14px",
              textDecoration: !buttonMode ? "none" : "line-through",
              }}      
          >
            {props.answer}
          </button>
        </h2>
      )}
      {props.phase === "results" && !props.answer && (
        <h2>
          {props.letter}
        </h2>
      )}

    </li>
  );
}