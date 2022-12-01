import AnswerList from './AnswerList';
import Podium from './Podium';

export default function GameBoard(props) {


  return (
    <div className="game-board-main">
      <div className="game-header">
        <h2>Animal Kingdom:</h2>
        <h1>Ocean</h1>
      </div>
      { props.phase === "game" || props.phase === "results" ?
        <AnswerList
          answers={props.answers}
          lastMessage={props.lastMessage}
          phase={props.phase}
          sendVote={props.sendVote}
          playerCount={props.playerCount}
          // counter={props.counter}
        />
        :
        props.phase === "podium" && <Podium /> }
    </div>
  );
}