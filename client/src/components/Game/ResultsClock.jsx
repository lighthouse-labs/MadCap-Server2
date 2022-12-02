import { useState, useEffect, Fragment } from "react";

export default function ResultsClock(props) {
  const [voteTimer, setVoteTimer] = useState(3);

  // setInterval to setTimeout... clearInterval to clearTimeout

  console.log("props.round inside Results ~~~~~~~~~: ", props.round);
  console.log("props.GameData.round inside Results ~~~~~~~~~: ", props.gameData.round);
  useEffect(() => {
    let timer = 0;
    if (props.phase === "results") {
      timer = voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 1000);
    }
    if (voteTimer === 0 && props.round <= props.gameData.rounds) {
      props.nextRound();
      props.setStatePhase("round");
    } else {
      props.setStatePhase("podium")
    }

    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Fragment>
      <span className="results-clock" style={{ color: "greenyellow", paddingLeft: '10px' }}>
        {voteTimer}
      </span>
    </Fragment>

  );
}