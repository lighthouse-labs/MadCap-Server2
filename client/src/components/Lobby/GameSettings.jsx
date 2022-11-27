import { Fragment } from "react";
import Box from '@mui/material/Box';

import OptionsBox from "./OptionsBox";
import CategoriesBox from "./CategoriesBox";

export default function GameSettings(props) {

  return (
    <Fragment>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        px: '10px'
      }}>
        <div className="settings-header">
          <h2>Game Settings</h2>
        </div>
        <CategoriesBox cats={props.cats} />
        <OptionsBox />
      </Box>
    </Fragment>
  );
}