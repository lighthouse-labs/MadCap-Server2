import { useState } from "react";
import classNames from "classnames";

export default function AnswerListItem(props) {
  const [voted, setVoted] = useState(false);
  const [buttonMode, setButtonState] = useState(false);
  const playerCount = 6;
  // console.log(props.letter)
  // console.log(props.id)

  const alphaRows = classNames(
    props.captureColour,
    "alpha-item",
    { "letter-captured": props.captureColour },
    { alpha2: props.id > 13 },
    { alpha1: props.id <= 13 },
    { "results-phase": props.phase === "results" },
    {}
  );
  const voteAgainst = () => {
    props.sendVote(props.letter);
  };

  const handleClick = () => {
    console.log(props)
    voteAgainst();
    setVoted(true);
  };

  let buttonsColour = props.votesAgainst * 0.05 * playerCount;
  // setButtonState(buttonClick < (playerCount / 2) - 1 ? false : true)
  if (props.votesAgainst > (playerCount - 1) / 2 && !buttonMode) {
    console.log("here");
    setButtonState(true);
  }

  return (
    <li className={alphaRows}>
      {props.phase === "game" && <h2>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2>
          <button
            onClick={handleClick}
            disabled={voted}
            style={{
              backgroundColor: !buttonMode
                ? `rgba(255,0,0,${buttonsColour})`
                : "#313e4454",
              fontSize: "14px",
              textDecoration: !buttonMode ? "none" : "line-through",
            }}
          >
            {props.answer}
          </button>
        </h2>
      )}
      {props.phase === "results" && !props.answer && <h2>{props.letter}</h2>}
    </li>
  );
}
