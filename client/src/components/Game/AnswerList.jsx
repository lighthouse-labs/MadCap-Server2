import AnswerListItem from "./AnswerListItem";

export default function AnswerList(props) {
  const answers = props.answers.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id={answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
      />
    );
  });
  return (
    <ul className="alpha-rows"
      style={{
        display: 'grid',
        width: '100%',
        'grid-template-columns': '93% 0%',
        'list-style-type': 'none',
        'padding-left': '10px'
      }}
    >{answers}</ul>
  );
}