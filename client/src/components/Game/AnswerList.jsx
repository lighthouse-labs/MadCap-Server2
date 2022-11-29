import AnswerListItem from "./AnswerListItem";

export default function AnswerList(props) {
  const answers = props.answers.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id= {answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
      />
    );
  });
  return <ul>{answers}</ul>;
}
