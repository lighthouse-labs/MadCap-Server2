import { useState, useEffect, Fragment } from "react";

export default function ResultsClock(props) {
  const [voteTimer, setVoteTimer] = useState(6);

  // setInterval to setTimeout... clearInterval to clearTimeout

  useEffect(() => {
    console.log("voteTimer", voteTimer);
    let timer = 0;
    if (props.phase === "results") {
      timer = voteTimer > 0 && setTimeout(() => setVoteTimer(prev => (prev - 1)), 1000);
    }
    if (voteTimer === 0) props.setStatePhase("round")
     
    return () => clearTimeout(timer);
  }, [voteTimer]);

  return (
    <Fragment>
      {voteTimer}
    </Fragment>

  );
}