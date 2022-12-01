import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


export default function Round (props) {
  const [gameTimer, setGameTimer] = useState(3);

  useEffect(() => {
    const timer =
      gameTimer > 0 && setInterval(() => setGameTimer(prev => (prev - 1)), 1000);
    if (gameTimer === 0) props.setStatePhase("game");
    return () => clearInterval(timer);
  }, [gameTimer]);

  return (
    <Box>
      <h1>Round #/#!</h1>
    </Box>
  )
}