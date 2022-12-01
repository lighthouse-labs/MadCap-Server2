// import { useState, useEffect } from 'react';
import AnswerList from './AnswerList';
import Podium from './Podium';

export default function GameBoard(props) {

 
  // const [voteTimer, setTimer] = useState(30);
  // useEffect(() => {
  //   const timer =
  //     voteTimer > 0 && setInterval(() => setTimer(voteTimer - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [voteTimer]);


  return (
    <div className="game-board-main">
      <div className="game-header">
        <h2>Animal Kingdom: {props.phase === "results" && props.voteTimer}</h2>
        <h1>Ocean</h1>
      </div>
      { props.phase === "game" || props.phase === "results" ?
        <AnswerList
          answers={props.answers}
          lastMessage={props.lastMessage}
          phase={props.phase}
          gameTimer={props.gameTimer}
          setStatePhase={props.setStatePhase}
        />
        :
        props.phase === "podium" && <Podium /> }
    </div>
  );
}