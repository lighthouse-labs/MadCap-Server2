import { Fragment } from "react";
import Box from '@mui/material/Box';

import OptionsBox from "./OptionsBox";
import CategoriesBox from "./CategoriesBox";

export default function GameSettings(props) {

  return (
    <Fragment>
      <Box sx={{
        backgroundColor: '#f0f5ff',
        display: 'flex',
        flexDirection: 'column',
        ml: 1,
        pl: '2px',
        width: '320px',
        minHeight: '440px',
        height: 'fit-content',
        pb: '3px'
      }}>
        <div className="settings-header">
          <h2>Game Settings</h2>
        </div>
        <CategoriesBox categories={props.categories} />
        <OptionsBox />
      </Box>
    </Fragment>
  );
}