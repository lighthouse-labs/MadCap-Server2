import { Fragment } from "react";
import Box from '@mui/material/Box';
import PlayersSlider from './PlayersSlider';
import TimerSlider from "./TimerSlider";
import RoundsSlider from './RoundsSlider';
import UpdateButton from "./UpdateButton";

export default function OptionsBox(props) {
  return (
    <Fragment>
      <Box className="options-box"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <TimerSlider />
        <PlayersSlider />
        <RoundsSlider />
        <UpdateButton handleSet={props.handleSet} />
      </Box>
    </Fragment>
  );
}