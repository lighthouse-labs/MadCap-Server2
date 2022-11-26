import { Fragment } from "react";
import Box from '@mui/material/Box';

import ActionAvatar from './ActionAvatar';
import UserName from './UserName';
import ActionButton from "./ActionButton";

export default function ActionWelcome() {
  return (
      // const MAKE = "MAKE";
  // const JOIN = "JOIN";
  // const START = "START";

  // const [btnState, setBtnState] = useState("");
// make visualMode hook
  // setBtnState(MAKE)
  // if no link use MAKE (default state)
  // if there is a custom link use JOIN
  // for host to start game, use START
    <Fragment>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          my: 1,
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 406,
          height: 340,
          width: '70%'
        }}>
        <ActionAvatar />
        <UserName />
        {<ActionButton message="Make New Game" />}
        {/* {btnState === JOIN && <ActionButton message="Join the Game!" />} */}
      </Box>
    </Fragment>
  );
}