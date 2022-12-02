// import { useState, useEffect } from 'react';
import AnswerList from './AnswerList';
import Podium from './Podium';
import ResultsClock from './ResultsClock';

export default function GameBoard(props) {


  // const [voteTimer, setVoteTimer] = useState(0);

  // useEffect(() => {
  //   console.log("voteTimer", voteTimer);
  //   let timer = 0
  //   if (props.phase === "results") {
  //     timer = voteTimer > 0 && setInterval(() => setVoteTimer(prev => (prev -1)), 1000);
  //   }
  //   if (voteTimer === 0) {
  //     props.setStatePhase("round");
  //     setVoteTimer(2);
  //   }
  //   return () => clearInterval(timer);
  // }, [voteTimer]);


  // const [voteTimer, setGameTimer] = useState(3);
  // useEffect(() => {
  //   const timer =
  //     voteTimer > 0 && setInterval(() => setGameTimer(prev => (prev - 1)), 1000);
  //   if (voteTimer === 0) props.setStatePhase("game");
  //   return () => clearInterval(timer);
  // }, [voteTimer]);


  return (
    <div className="game-board-main">
      <div className="game-header">
        <h2>{props.category}: {props.phase === "results" &&
          <ResultsClock phase={props.phase}
            setStatePhase={props.setStatePhase} />}
        </h2>
        <h1>{props.subcategory}</h1>
      </div>
      {
        props.phase === "game" ||
          props.phase === "results" ||
          props.phase === "round" ?
          <AnswerList
            answers={props.answers}
            lastMessage={props.lastMessage}
            phase={props.phase}
            setStatePhase={props.setStatePhase}
            gameTimer={props.gameTimer}
            sendVote={props.sendVote}
            playerCount={props.playerCount}
          />
          :
          props.phase === "podium" &&
          <Podium setStatePhase={props.setStatePhase}
            players={props.players}
          />
      }
    </div>
  );
}