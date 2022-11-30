import classNames from "classnames";

export default function AnswerListItem(props) {
  // console.log(props.letter)
  // console.log(props.id)
  let alphaRows = classNames(
    props.captureColour,
    { "letter-captured": props.captureColour },
    {"alpha2": props.id > 13 },
    {"alpha1": props.id <= 13 },
    {}
  );
  return (
    <li className={`alpha-item ${alphaRows}`}>
      <h2>{props.letter}</h2>
    </li>
  );
}