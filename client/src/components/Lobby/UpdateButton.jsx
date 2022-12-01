import { Fragment } from 'react';
import Button from '@mui/material/Button';

export default function UpdateButton(props) {

  return (
    <Fragment>
      <Button onClick={props.handleSet} variant="contained" color="success" size="large"
        sx={{
          width: '93%',
          height: 35,
          fontSize: '20px'
        }}
      >set</Button>
    </Fragment>
  );
}