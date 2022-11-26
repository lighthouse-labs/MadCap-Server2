// import useState from 'react';
import Box from '@mui/material/Box';
import AvatarSelect from './AvatarSelect'
import UserName from './UserName';
import ActionButton from "./ActionButton";

import './Welcome.css';

export default function Welcome(props) {

  // const MAKE = "MAKE";
  // const JOIN = "JOIN";
  // const START = "START"; 


  // if no link use MAKE (default state)
  // if there is a custom link use JOIN
  // for host to start game, use START


  return (
    <div className="welcome-main">
      <h1>MadCap</h1>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 406,
          height: 480,
          width: '70%'
      }}>
        <AvatarSelect />
        <UserName />
        <ActionButton message="Make New Game" />
        {/* <ActionButton message="Join the Game!" /> */}
      </Box>
    </div>

  );
}