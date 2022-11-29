import Box from '@mui/material/Box';

import AnswerList from './AnswerList';

export default function GameBoard(props) {

  return (
    <div className="game-board-main">
      <Box sx={{width: '100%'}}>
      <div className="game-header">
          <h2>Category:</h2>
          <h1>Fruits</h1>
        </div>
        <AnswerList answers={props.answers} />
      </Box>
      
    </div>
  );
}