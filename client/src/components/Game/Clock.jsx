import { useState, useEffect, Fragment } from "react";

export default function Clock(props) {

  const seconds = 5;
  const [gameTimer, setGameTimer] = useState(seconds);

  useEffect(() => {
    const timer =
      gameTimer > 0 && setInterval(() => setGameTimer(gameTimer - 1), 1000);
    if (gameTimer === 0) {
      props.setStatePhase()
    }
    return () => clearInterval(timer);
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