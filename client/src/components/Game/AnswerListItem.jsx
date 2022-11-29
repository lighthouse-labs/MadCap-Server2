
import classNames from "classnames";
import './styles.css';

export default function AnswerListItem(props) {
  let captureColour = classNames(
    "letter-uncaptured",
    { "letter-captured": props.captureColour},
    {}
  );
  return (
    <li
    className = {props.captureColour}
    >
     <h2>{props.letter}</h2> 
    </li>
  );
};

