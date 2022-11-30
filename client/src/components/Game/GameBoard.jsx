import AnswerList from './AnswerList';

export default function GameBoard(props) {


  return (
    <div className="game-board-main">
      <div className="game-header">
        <h2>Animal Kingdom</h2>
        <h1>Ocean</h1>
      </div>
      <AnswerList answers={props.answers}
        lastMessage={props.lastMessage}
        phase = {props.phase} />
    </div>
  );
}