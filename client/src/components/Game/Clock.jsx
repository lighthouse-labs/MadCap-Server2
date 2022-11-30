import { useState, useEffect, Fragment } from "react";

export default function Clock() {

  const seconds = 60
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (

    <Fragment>
      <h1>THE TIMER</h1>
      <h1 style={{width: 'fit-content',
    textAlign: 'center'}}>{counter}</h1>
    </Fragment>

  );
}