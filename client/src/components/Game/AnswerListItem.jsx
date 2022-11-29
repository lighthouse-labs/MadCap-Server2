import classNames from "classnames";
import "./styles.css";

export default function AnswerListItem(props) {
  // console.log(props.letter)
  // console.log(props.id)
  let captureColour = classNames(
    props.captureColour,
    { "letter-captured": props.captureColour },
    {"alpha2": props.id > 13 },
    {"alpha1": props.id <= 13 },
    {}
  );
  return (
    <li className={captureColour}>
      <h2>{props.letter}</h2>
    </li>
  );
}
