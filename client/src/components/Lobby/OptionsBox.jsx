import { Fragment } from "react";
import Box from '@mui/material/Box';
import PlayersSlider from './PlayersSlider';
import TimerSlider from "./TimerSlider";
import RoundsSlider from './RoundsSlider';
import UpdateButton from "./UpdateButton";

export default function OptionsBox(props) {

  const { timer, maxPlayers, rounds } = props.settings;

  const setTimer = (timer) => {
    props.setSettings((prev) => (
      {
        ...prev,
        timer
      }
    ))
  }

  const setMaxPlayers = (maxPlayers) => {
    props.setSettings((prev) => (
      {
        ...prev,
        maxPlayers
      }
    ))
  }

  const setRounds =(rounds) => {
    props.setSettings((prev) => (
      {
        ...prev,
        rounds
      }
    ))
  }

  return (
    <Fragment>
      <Box className="options-box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <TimerSlider timer={timer} setTimer={setTimer}/>
        <PlayersSlider maxPlayers={maxPlayers} setMaxPlayers={setMaxPlayers}/>
        <RoundsSlider rounds={rounds} setRounds={setRounds}/>
        <UpdateButton handleSet={props.handleSet} />
      </Box>
    </Fragment>
  );
}