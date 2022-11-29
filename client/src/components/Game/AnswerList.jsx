import AnswerListItem from "./AnswerListItem";

export default function AnswerList(props) {
  const firstHalf = props.answers.slice(0, 12)
  const secondHalf = props.answers.slice(12)
  const answers1 = firstHalf.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id= {answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
      />
    );
  });
  const answers2 = secondHalf.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id= {answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
      />
    );
  });
  return <div>
  <ul>{answers1}</ul>
  <ul>{answers2}</ul>
  </div>
}
