import classNames from "classnames";

export default function AnswerListItem(props) {
  // console.log(props.letter)
  // console.log(props.id)
  let alphaRows = classNames(
    props.captureColour,
    "alpha-item",
    { "letter-captured": props.captureColour },
    { alpha2: props.id > 13 },
    { alpha1: props.id <= 13 },
    { "results-phase": props.phase === "results" },
    {}
  );
  return (
    <li className={alphaRows}>
      {props.phase === "game" && <h2>{props.letter}</h2>}
      {props.phase === "results" && props.answer && (
        <h2>
          
          <button onClick={console.log("click")}>{props.answer}</button>
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