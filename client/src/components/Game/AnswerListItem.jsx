import { useState } from "react";
import classNames from "classnames";

export default function AnswerListItem(props) {
  const [voted, setVoted] = useState(false);
  const [buttonMode, setButtonState] = useState(false);
  const [disableButton, setDisabled] = useState(false)
  // const playerCount = 6;
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
    console.log(props)
    let voteObject = {
      letter: props.letter,
      userId: props.userId
    }
    props.sendVote(voteObject);
  };

  const handleClick = () => {
    console.log(props)
    voteAgainst();
    setVoted(true);
  };

  let buttonsColour = props.votesAgainst * (0.25 * (12 - props.playerCount));
  // setButtonState(buttonClick < (playerCount / 2) - 1 ? false : true)
  if (props.playercount > 1 && props.votesAgainst >= (props.playerCount - 1) / 2 && !buttonMode) {
    console.log("here");
    setButtonState(true);
  }
  if ((voted || buttonMode) && !disableButton){
    console.log("breaker")
    setDisabled(true)
  }

  return (
    <li className={alphaRows}>
      {props.phase === "game" && <h2>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2>
          <button
            onClick={handleClick}
            disabled={disableButton}
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
