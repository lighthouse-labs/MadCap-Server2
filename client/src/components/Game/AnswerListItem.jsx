import classNames from "classnames";
import "./styles.css";

export default function AnswerListItem(props) {
  // console.log(props.letter)
  // console.log(props.id)
  let captureColour = classNames(
    props.captureColour,
    { "letter-captured": props.captureColour },
    { alpha2: props.id > 13 },
    { alpha1: props.id <= 13 },
    { "results-phase": props.phase === "results" },
    {}
  );
  return (
    <li className={captureColour}>
      {props.phase === "game" && <h2>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2>
          {props.answer}
          <button onClick={console.log("click")}>Reject!</button>
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
