import { useState, useEffect, Fragment } from "react";

export default function Clock(props) {

  const seconds = 1;
  const [gameTimer, setGameTimer] = useState(seconds);

  // setInterval to setTimeout... clearInterval to clearTimeout
  useEffect(() => {
    const timer =
      gameTimer > 0 && setTimeout(() => setGameTimer(prev => (prev - 1)), 1000);
    if (gameTimer === 0) props.setStatePhase("results");
    return () => clearTimeout(timer);
  }, [gameTimer]);

  return (

    <Fragment>

      <h1>THE TIMER</h1>
      <h1 style={{
        width: 'fit-content',
        textAlign: 'center'
      }}>
        {gameTimer}
      </h1>

    </Fragment>

  );
}