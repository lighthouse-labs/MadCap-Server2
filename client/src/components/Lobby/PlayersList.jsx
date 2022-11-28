import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function PlayersList() {
  return (
    <Fragment>
      <Box className="players-box">
        <Paper elevation={3} sx={{
          height: 600,
          p: '15px'
        }}>
          <ul style={{
            "listStyleType": "none", 
            "paddingLeft": "0"}}>
            <li>Hostdummy</li>
            <li>Player1</li>
            <li>Player2</li>
            <li>Player3</li>
            <li>Player4</li>
            <li>Player5</li>
          </ul>
        </Paper>
      </Box>
    </Fragment>
  );
}