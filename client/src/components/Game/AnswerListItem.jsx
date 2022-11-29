import classNames from "classnames";
import "./styles.css";

export default function AnswerListItem(props) {

  return (
    <li className={props.captureColour}>
      <h2>{props.letter}</h2>
    </li>
  );
}
