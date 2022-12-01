import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import Box from '@mui/material/Box';

import Avatar from './Avatar';
import UserName from './UserName';
import ActionButton from "./ActionButton";
import axios from "axios";

export default function WelcomeBox(props) {
  const { url, name, handleName } = props;
  const MAKE = "MAKE";
  const JOIN = "JOIN";

  const [btnState, setBtnState] = useState("MAKE")

  useEffect(() => {
    setBtnState(props.url_path ? "JOIN" : "MAKE")
  }, [props.url_path])

  // if no link use MAKE (default state)
  // if there is a custom link use JOIN

  const [avatar_url, setAvatar_url] = useState();
  const [color, setColor] = useState();

  const navigate = useNavigate();

  const makeGame = () => {
   
      axios.post("/api/games", { url })
      .then(() => (
        axios.post(`/api/games/${url}/users`, {
          name,
          color,
          avatar_url,
          host: true
        })
      ))
      .then((response) => {
        console.log("Current user id", response.data.id)
        props.setCurrentUser(response.data.id)
      })
      .then(() => {
        props.setHost();
      })
      .then(() => {
        navigate(`/${url}`)
      })
      .catch((err) => console.error(err));

  }

  const joinGame = () => {
     
      axios.post(`/api/games/${props.url_path}/users`, {
        name,
        color,
        avatar_url,
        host: false
      })
      .then((response) => {
        props.setCurrentUser(response.data.id)
      })
      .then(() => {
        props.transition("LOBBY")
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
          handleName={handleName}
          name={name} />
        {btnState === MAKE && <ActionButton
          message="Make New Game"
          onClick={makeGame} 
        />}
        {btnState === JOIN && <ActionButton
          message="Join the Game!"
          onClick={joinGame}
        />}
      </Box>
    </Fragment>
  );
}