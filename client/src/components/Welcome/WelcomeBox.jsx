import { Fragment, useRef, useState } from "react";
import Box from '@mui/material/Box';

import Avatar from './Avatar';
import UserName from './UserName';
import ActionButton from "./ActionButton";
import axios from "axios";
import { generateRandomString } from "../../helpers/helpers";

export default function WelcomeBox(props) {
 

  // const MAKE = "MAKE";
  // const JOIN = "JOIN";
  // if no link use MAKE (default state)
  // if there is a custom link use JOIN

  const [avatar_url, setAvatar_url] = useState();
  const [color, setColor] = useState();
  const [name, setName] = useState()


  const createGame = (avatar_url, color) => {
    Promise.all([
      axios.post("/api/games", { url: props.url }),
      axios.post(`/api/games/${url}/users`, { name, color, avatar_url})
    ])
    .then(() => {
      props.onClick
    })
    .catch((err) => console.error(err));

  } 


  return (
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
          maxWidth: '435px',
          height: 340,
          width: '97%'
        }}>
        <Avatar
          setAvatar={setAvatar_url}
          setColor={setColor}  
        />
        <UserName
          handleName={props.handleName}
          name={props.name} />
        <ActionButton
          onClick={props.onClick} 
          message="Make New Game" />
        {/* {btnState === JOIN && <ActionButton message="Join the Game!" />} */}
      </Box>
    </Fragment>
  );
}