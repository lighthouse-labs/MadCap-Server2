import Box from '@mui/material/Box';
import AnswerListItem from "./AnswerListItem";
import Clock from './Clock';
import Notice from './Notice';


export default function AnswerList(props) {
  const firstHalf = props.answers.slice(0, 13);
  const secondHalf = props.answers.slice(13);
  const answers1 = firstHalf.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id={answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
        answer = {answer.answer}
        phase = {props.phase}
      />
    );
  });
  const answers2 = secondHalf.map((answer) => {
    return (
      <AnswerListItem
        key={answer.id}
        id={answer.id}
        letter={answer.letter}
        captureColour={answer.captureColour}
        phase = {props.phase}
      />
    );
  });
  return (
    <div className="game-board-inner">
      <ul className="alpha-row alpha1">{answers1}</ul>
      <div className="game-board-inner-center">
        <Box className="clock">
          <Clock />
        </Box>
        <Notice lastMessage={props.lastMessage}/>
      </div>
      <ul className="alpha-row alpha2">{answers2}</ul>
    </div>
  );
}
