import { useState, useEffect, Fragment } from "react";

export default function ResultsClock(props) {
  const [voteTimer, setVoteTimer] = useState(11);

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    let timer = 0;
    if (props.phase === "results") {
      timer = voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 1000);
    }
    if (voteTimer === 0) props.setStatePhase("round")
     
    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Fragment>
    <span className="results-clock" style={{color: "greenyellow"}}>
      {voteTimer}
    </span>
    </Fragment>

  );
}